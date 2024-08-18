import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import webapi from 'utils/WebAPI';

const TravelPlanWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchBoxWrapper = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #4dabf7;
    box-shadow: 0 0 0 2px rgba(77,171,247,.2);
  }
`;

const PlacesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PlaceItem = styled.li`
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`;

const DragHandle = styled.span`
  margin-right: 10px;
  color: #6c757d;
  cursor: grab;
`;

const PlaceName = styled.span`
  flex-grow: 1;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #6c757d;
  margin-top: 20px;
`;

const TravelPlan = () => {
  const [places, setPlaces] = useState([]);
  const [searchBox, setSearchBox] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await webapi.get('/api/places', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const onPlaceSelected = async () => {
    const place = searchBox.getPlaces()[0];
    const newPlace = { id: place.place_id, name: place.name };
    try {
      const response = await webapi.post('/api/places', newPlace, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPlaces([...places, newPlace]);
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const newPlaces = Array.from(places);
    const [reorderedItem] = newPlaces.splice(result.source.index, 1);
    newPlaces.splice(result.destination.index, 0, reorderedItem);

    setPlaces(newPlaces);

    try {
      await webapi.put('/api/places/reorder', { places: newPlaces }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error('Error reordering places:', error);
    }
  };

  const removePlace = async (id) => {
    try {
      await webapi.delete(`/api/places/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPlaces(places.filter(place => place.id !== id));
    } catch (error) {
      console.error('Error removing place:', error);
    }
  };

  if (!isLoaded || isLoading) return <LoadingMessage>Loading...</LoadingMessage>;

  return (
    <TravelPlanWrapper>
      <Title>旅遊規劃</Title>
      <SearchBoxWrapper>
        <StandaloneSearchBox
          onLoad={ref => setSearchBox(ref)}
          onPlacesChanged={onPlaceSelected}
        >
          <SearchInput type="text" placeholder="搜索並添加地點" />
        </StandaloneSearchBox>
      </SearchBoxWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="places-list">
          {(provided) => (
            <PlacesList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {places.map((place, index) => (
                <Draggable key={place.id} draggableId={String(place.id)} index={index}>
                  {(provided) => (
                    <PlaceItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DragHandle>☰</DragHandle>
                      <PlaceName>{place.name}</PlaceName>
                      <RemoveButton onClick={() => removePlace(place.id)}>
                        刪除
                      </RemoveButton>
                    </PlaceItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </PlacesList>
          )}
        </Droppable>
      </DragDropContext>
    </TravelPlanWrapper>
  );
};

export default TravelPlan;