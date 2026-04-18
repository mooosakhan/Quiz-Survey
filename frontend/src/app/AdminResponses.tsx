import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import API_BASE_URL from '@/config';

interface UserResponse {
  _id: string;
  name: string;
  designation: string;
  responses: Record<string, number>;
  ratings: {
    onboarding1: number;
    onboarding2: number;
    modern: number;
    gamified1: number;
    professional1: number;
    professional2: number;
    clean: number;
    gamified2: number;
    gamified3: number;
  };
  createdAt: string;
}

const designNames = [
  'Onboarding 1',
  'Onboarding 2',
  'Modern',
  'Gamified 1',
  'Professional 1',
  'Professional 2',
  'Clean',
  'Gamified 2',
  'Gamified 3'
];

const questionOptions = [
  [
    "Organize and manage academic tasks (assignments, exams, classes, etc.)",
    "Provide a platform for communication and collaboration between students and teachers",
    "Track academic progress and provide insights for improvement"
  ],
  [
    "Simple and clean, with a focus on functionality and usability",
    "Bold and colorful, using vibrant tones to energize and motivate students",
    "Sleek and modern, with a professional and polished design aesthetic"
  ],
  [
    "Subtle animations (smooth transitions, fading in/out) with flat UI elements",
    "Interactive elements with bold animations (buttons that pop, hover effects)",
    "No animations, focus on static, straightforward elements for simplicity"
  ],
  [
    "Minimalist and clean with a focus on simplicity and ease of use",
    "Bright, vibrant, and engaging with bold colors to motivate students",
    "Professional and academic with a more structured, traditional look"
  ],
  [
    "User engagement (daily/weekly active users)",
    "Task completion rates (how often students complete assignments or tasks)",
    "Retention and return rate (how many students continue using the app over time)"
  ]
];

export default function AdminResponsesPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/users/all`);
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError('Failed to fetch responses');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure backend is running on port 5000.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    if (users.length === 0) return 0;
    const total = users.reduce((sum, user) => {
      const ratings = user.ratings;
      const designRatings = [
        ratings.onboarding1,
        ratings.onboarding2,
        ratings.modern,
        ratings.gamified1,
        ratings.professional1,
        ratings.professional2,
        ratings.clean,
        ratings.gamified2,
        ratings.gamified3
      ];
      return sum + designRatings.reduce((a, b) => a + (b || 0), 0);
    }, 0);
    const count = users.length * 9;
    return (total / count).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Survey Responses Dashboard</h1>
          <p className="text-slate-400">Secret Admin Panel - Do not share this URL</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Responses</p>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Average Design Rating</p>
            <p className="text-3xl font-bold text-blue-400">{getAverageRating()}/10</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Response Rate</p>
            <p className="text-3xl font-bold text-green-400">{users.length > 0 ? '100%' : '0%'}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Last Submission</p>
            <p className="text-sm font-semibold text-white">
              {users.length > 0
                ? new Date(users[0].createdAt).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Responses List */}
        {users.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700"
          >
            <p className="text-slate-400 text-lg">No responses yet</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setExpandedUser(expandedUser === user._id ? null : user._id)
                  }
                  className="w-full bg-slate-800 hover:bg-slate-700 rounded-lg p-6 border border-slate-700 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {user.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{user.designation}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {new Date(user.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-semibold">
                        Avg Rating:{' '}
                        {(
                          Object.values(user.ratings).reduce(
                            (a, b) => a + (b || 0),
                            0
                          ) / 9
                        ).toFixed(1)}
                        /10
                      </p>
                      <p className="text-slate-400 text-sm">
                        {expandedUser === user._id ? '▼' : '▶'} Click to expand
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedUser === user._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-slate-700 space-y-6"
                    >
                      {/* Survey Responses */}
                      <div>
                        <h4 className="text-white font-semibold mb-4">
                          Survey Responses
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(user.responses).map(
                            ([questionIndex, optionIndex]) => (
                              <div
                                key={questionIndex}
                                className="bg-slate-700/50 rounded p-3"
                              >
                                <p className="text-slate-300 text-sm font-semibold mb-1">
                                  Q{parseInt(questionIndex) + 1}:
                                </p>
                                <p className="text-slate-200 text-sm">
                                  {
                                    questionOptions[parseInt(questionIndex)][
                                      optionIndex
                                    ]
                                  }
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Design Ratings */}
                      <div>
                        <h4 className="text-white font-semibold mb-4">
                          Design Ratings
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {designNames.map((name, index) => {
                            const ratingKey = Object.keys(user.ratings)[
                              index
                            ] as keyof typeof user.ratings;
                            const rating = user.ratings[ratingKey];
                            return (
                              <div
                                key={index}
                                className="bg-slate-700/50 rounded p-3"
                              >
                                <p className="text-slate-300 text-sm font-semibold">
                                  {name}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="flex-1 bg-slate-600 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{
                                        width: `${(rating / 10) * 100}%`
                                      }}
                                    />
                                  </div>
                                  <span className="text-blue-400 font-semibold text-sm">
                                    {rating}/10
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div>
                        <h4 className="text-white font-semibold mb-4">
                          Metadata
                        </h4>
                        <div className="bg-slate-700/50 rounded p-3 space-y-2 text-sm">
                          <p>
                            <span className="text-slate-400">User ID:</span>
                            <span className="text-slate-300 ml-2 font-mono">
                              {user._id}
                            </span>
                          </p>
                          <p>
                            <span className="text-slate-400">Submitted:</span>
                            <span className="text-slate-300 ml-2">
                              {new Date(user.createdAt).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchUsers}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Refresh Data
        </motion.button>
      </div>
    </div>
  );
}
