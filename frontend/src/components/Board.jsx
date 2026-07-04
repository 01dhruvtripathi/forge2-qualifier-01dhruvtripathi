import { useState } from 'react';
import api from '../api';
import List from './List';
import { Plus } from 'lucide-react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export default function Board({ board, refreshBoards }) {
  const [newListTitle, setNewListTitle] = useState('');

  const createList = async (e) => {
    e.preventDefault();
    if (!newListTitle) return;
    try {
      await api.post('/lists', { board_id: board.id, title: newListTitle });
      setNewListTitle('');
      refreshBoards();
    } catch (e) {
      console.error(e);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      await api.put(`/cards/${draggableId}/move`, {
        board_list_id: parseInt(destination.droppableId),
        position: destination.index
      });
      refreshBoards();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 h-full items-start overflow-x-auto pb-4 px-2">
        {board.lists?.map((list) => (
          <List key={list.id} list={list} refreshBoards={refreshBoards} />
        ))}
        
        <div className="min-w-[300px] w-[300px] glass-dark rounded-xl p-3 shadow-lg">
          <form onSubmit={createList} className="flex flex-col gap-2">
            <input 
              type="text" 
              placeholder="Add another list" 
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-white/20 transition-all"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium p-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
              <Plus size={18} /> Add List
            </button>
          </form>
        </div>
      </div>
    </DragDropContext>
  );
}
