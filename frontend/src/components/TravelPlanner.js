import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const PlaceList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PlaceItem = styled.li`
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 5px;
`;

const TravelPlanner = () => {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // 從後端加載保存的地點
    const fetchPlaces = async () => {
      const response = await axios.get('/api/places', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPlaces(response.data);
    };
    fetchPlaces();
  }, []);

  const handleSearch = async () => {
    // 使用 Google Places API 進行搜索
    // 這裡需要實現搜索邏輯
  };

  const handleAddPlace = async (place) => {
    const response = await axios.post('/api/places', place, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPlaces([...places, response.data]);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const newPlaces = Array.from(places);
    const [reorderedItem] = newPlaces.splice(result.source.index, 1);
    newPlaces.splice(result.destination.index, 0, reorderedItem);

    setPlaces(newPlaces);

    // 更新後端的順序
    await axios.put('/api/places/reorder', { places: newPlaces }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  };

  return (
    <div>
      <SearchInput
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索地點"
      />
      <button onClick={handleSearch}>搜索</button>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="places">
          {(provided) => (
            <PlaceList {...provided.droppableProps} ref={provided.innerRef}>
              {places.map((place, index) => (
                <Draggable key={place.id} draggableId={place.id} index={index}>
                  {(provided) => (
                    <PlaceItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {place.name}
                    </PlaceItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </PlaceList>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TravelPlanner;