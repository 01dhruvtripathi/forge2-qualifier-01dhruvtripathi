import { useState } from 'react';
import api from '../api';
import Card from './Card';
import { Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';

export default function List({ list, refreshBoards }) {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const createCard = async (e) => {
    e.preventDefault();
    if (!newCardTitle) return;
    try {
      await api.post('/cards', { board_list_id: list.id, title: newCardTitle });
      setNewCardTitle('');
      setIsAdding(false);
      refreshBoards();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteList = async () => {
    try {
      await api.delete(`/lists/${list.id}`);
      refreshBoards();
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="min-w-[320px] w-[320px] glass-card rounded-2xl flex flex-col max-h-[85vh] shadow-xl overflow-hidden border border-white/50 backdrop-blur-xl">
      <div className="flex justify-between items-center p-4 bg-white/40 border-b border-white/50">
        <h3 className="font-bold text-gray-800 text-lg tracking-tight">{list.title}</h3>
        <div className="flex gap-2">
          <button onClick={deleteList} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-white/50">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <Droppable droppableId={String(list.id)}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto p-3 space-y-3 transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-indigo-50/50' : ''}`}
          >
            {list.cards?.map((card, index) => (
              <Card key={card.id} card={card} index={index} refreshBoards={refreshBoards} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="p-3 bg-white/30 border-t border-white/50">
        {isAdding ? (
          <form onSubmit={createCard} className="flex flex-col gap-2">
            <textarea 
              autoFocus
              className="w-full p-3 rounded-xl shadow-inner border border-gray-200 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Enter a title for this card..."
              rows={2}
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  createCard(e);
                }
              }}
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-indigo-600 text-white font-medium py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors">Add</button>
              <button type="button" onClick={() => setIsAdding(false)} className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-white/60 font-medium p-2 rounded-xl w-full transition-all"
          >
            <Plus size={18} className="mr-1" /> Add a card
          </button>
        )}
      </div>
    </div>
  );
}
