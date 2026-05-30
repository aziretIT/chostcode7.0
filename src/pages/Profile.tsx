import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { FaUser, FaBook, FaTrophy, FaCertificate, FaLogOut } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { t } = useTranslation('common');
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">User not found</h1>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Points',
      value: user.totalPoints,
      icon: FaTrophy,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Courses Completed',
      value: user.completedCourses.length,
      icon: FaBook,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      label: 'Certificates',
      value: user.certificates.length,
      icon: FaCertificate,
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
                <p className="text-indigo-100">{user.email}</p>
                <p className="text-sm text-indigo-100 mt-2">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              <FaLogOut />
              <span>{t('navigation.logout')}</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Completed Courses */}
        {user.completedCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.completedCourses.map((course) => (
                <div
                  key={course}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <FaBook className="text-indigo-600 text-2xl" />
                  <span className="font-semibold text-gray-900 capitalize">{course}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;