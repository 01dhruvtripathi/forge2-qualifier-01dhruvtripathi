import { useState } from 'react';
import api from '../api';
import { Calendar, MessageSquare, GripVertical } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

export default function Card({ card, index, refreshBoards }) {
  const isOverdue = card.due_date && new Date(card.due_date) < new Date();

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group ${snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-400 rotate-2' : ''}`}
        >
          <div className="flex flex-wrap gap-1.5 mb-2">
            {card.tags?.map(tag => (
              <span key={tag.id} className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ backgroundColor: tag.color, color: '#fff' }}>
                {tag.name}
              </span>
            ))}
          </div>
          
          <div className="flex items-start gap-2">
            <GripVertical size={16} className="text-gray-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-semibold text-gray-800 break-words leading-tight">{card.title}</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            {card.due_date && (
              <div className={`flex items-center text-[11px] font-semibold px-2 py-1 rounded-md ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                <Calendar size={12} className="mr-1.5" />
                <span>{new Date(card.due_date).toLocaleDateString()}</span>
              </div>
            )}
            {card.comments?.length > 0 && (
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <MessageSquare size={12} className="mr-1" />
                {card.comments.length}
              </div>
            )}
            {card.users?.length > 0 && (
              <div className="ml-auto flex -space-x-2">
                {card.users.map(u => (
                  <div key={u.id} className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[9px] text-white font-bold border-2 border-white" title={u.name}>
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
