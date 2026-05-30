import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourseStore } from '../store/courseStore';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCode, FaCheckCircle } from 'react-icons/fa';

const LessonDetail: React.FC = () => {
  const { t } = useTranslation('courses');
  const { courseId, levelId, lessonId } = useParams<{
    courseId: string;
    levelId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const { getCourseById } = useCourseStore();
  const [completed, setCompleted] = React.useState(false);

  const course = getCourseById(courseId || '');
  const level = course?.levels.find((l) => l.id === levelId);
  const lesson = level?.lessons.find((l) => l.id === lessonId);

  if (!course || !level || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Lesson Not Found</h1>
          <Link to="/courses" className="mt-4 btn-primary inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-lg text-indigo-100">{lesson.description}</p>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Content</h2>
          <div className="prose prose-sm max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
          </div>
        </motion.div>

        {/* Code Examples */}
        {lesson.examples.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <FaCode />
              <span>Code Examples</span>
            </h2>

            <div className="space-y-6">
              {lesson.examples.map((example) => (
                <div key={example.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">{example.title}</h3>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-6 font-mono text-sm overflow-x-auto">
                    <pre>{example.code}</pre>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Complete Lesson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <Link
            to={`/courses/${courseId}/levels/${levelId}`}
            className="btn-secondary flex items-center space-x-2"
          >
            <span>Back to Level</span>
            <FaArrowLeft />
          </Link>

          <button
            onClick={() => setCompleted(true)}
            className={`btn-primary flex items-center space-x-2 ${completed ? 'bg-green-600' : ''}`}
          >
            <FaCheckCircle />
            <span>{completed ? 'Completed!' : 'Mark as Complete'}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonDetail;