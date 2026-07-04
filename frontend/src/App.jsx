import { useState, useEffect } from 'react';
import api from './api';
import Board from './components/Board';
import { LayoutDashboard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await api.get('/boards');
      setBoards(res.data);
      if (res.data.length > 0 && !selectedBoard) {
        setSelectedBoard(res.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createBoard = async (e) => {
    e.preventDefault();
    if (!newBoardTitle) return;
    try {
      const res = await api.post('/boards', { title: newBoardTitle });
      setBoards([...boards, res.data]);
      setNewBoardTitle('');
      setSelectedBoard(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      <header className="glass sticky top-0 z-50 text-gray-800 p-4 flex items-center shadow-sm">
        <motion.div 
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-xl mr-3 shadow-lg"
        >
          <Sparkles size={24} />
        </motion.div>
        <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
          Tiny Kanban
        </h1>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <LayoutDashboard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <select 
              className="glass appearance-none pl-9 pr-8 py-2 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              value={selectedBoard?.id || ''}
              onChange={(e) => setSelectedBoard(boards.find(b => b.id === parseInt(e.target.value)))}
            >
              <option value="" disabled>Select a Board</option>
              {boards.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
            </select>
          </div>
          
          <form onSubmit={createBoard} className="flex">
            <input 
              type="text" 
              placeholder="New Board..." 
              className="px-4 py-2 glass rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              value={newBoardTitle}
              onChange={e => setNewBoardTitle(e.target.value)}
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-r-lg text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105">
              Create
            </button>
          </form>
        </div>
      </header>
      
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-6 relative">
        <AnimatePresence mode="wait">
          {selectedBoard ? (
            <motion.div
              key={selectedBoard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Board board={selectedBoard} refreshBoards={fetchBoards} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full flex-col text-gray-400"
            >
              <LayoutDashboard size={64} className="mb-4 opacity-50" />
              <p className="text-xl font-medium">Create a board to get started</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
