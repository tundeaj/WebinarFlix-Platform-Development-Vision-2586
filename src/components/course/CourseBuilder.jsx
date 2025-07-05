import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiPlus, FiTrash2, FiMove, FiVideo, FiFileText, FiHelpCircle, FiSave, FiEye } = FiIcons

const CourseBuilder = ({ courseId = null, onSave }) => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Introduction',
      lessons: [
        { id: 1, title: 'Welcome to the Course', type: 'video', duration: '5 min' },
        { id: 2, title: 'Course Overview', type: 'text', duration: '10 min' }
      ]
    }
  ])
  
  const [selectedModule, setSelectedModule] = useState(0)
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    difficulty: 'beginner',
    thumbnail: ''
  })

  const { register, handleSubmit, formState: { errors } } = useForm()

  const addModule = () => {
    const newModule = {
      id: Date.now(),
      title: 'New Module',
      lessons: []
    }
    setModules([...modules, newModule])
  }

  const addLesson = (moduleIndex) => {
    const newLesson = {
      id: Date.now(),
      title: 'New Lesson',
      type: 'video',
      duration: '0 min'
    }
    
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.push(newLesson)
    setModules(updatedModules)
  }

  const removeModule = (moduleIndex) => {
    const updatedModules = modules.filter((_, index) => index !== moduleIndex)
    setModules(updatedModules)
    if (selectedModule >= updatedModules.length) {
      setSelectedModule(Math.max(0, updatedModules.length - 1))
    }
  }

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(
      (_, index) => index !== lessonIndex
    )
    setModules(updatedModules)
  }

  const updateModule = (moduleIndex, field, value) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex][field] = value
    setModules(updatedModules)
  }

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value
    setModules(updatedModules)
  }

  const saveCourse = (data) => {
    const courseData = {
      ...courseDetails,
      ...data,
      modules,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    console.log('Saving course:', courseData)
    toast.success('Course saved successfully!')
    
    if (onSave) {
      onSave(courseData)
    }
  }

  const publishCourse = () => {
    console.log('Publishing course...')
    toast.success('Course published successfully!')
  }

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return FiVideo
      case 'text': return FiFileText
      case 'quiz': return FiHelpCircle
      default: return FiFileText
    }
  }

  return (
    <div className="min-h-screen bg-netflix-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Course Builder</h1>
            <p className="text-netflix-light">Create and manage your course content</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={publishCourse}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <SafeIcon icon={FiEye} className="w-5 h-5" />
              <span>Publish</span>
            </button>
            
            <button
              onClick={handleSubmit(saveCourse)}
              className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <SafeIcon icon={FiSave} className="w-5 h-5" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-netflix-black rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Course Details</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Course Title</label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="Enter course title"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Description</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white h-24"
                    placeholder="Course description"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-netflix-light text-sm mb-2">Price ($)</label>
                    <input
                      {...register('price', { required: 'Price is required', min: 0 })}
                      type="number"
                      className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-netflix-light text-sm mb-2">Category</label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">Select category</option>
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Difficulty</label>
                  <select
                    {...register('difficulty')}
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-netflix-light text-sm mb-2">Thumbnail URL</label>
                  <input
                    {...register('thumbnail')}
                    type="url"
                    className="w-full bg-netflix-gray border border-netflix-light rounded-lg px-3 py-2 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </form>
            </motion.div>

            {/* Module List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-netflix-black rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Modules</h2>
                <button
                  onClick={addModule}
                  className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Add Module</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedModule === index ? 'bg-netflix-red' : 'bg-netflix-gray hover:bg-netflix-light'
                    }`}
                    onClick={() => setSelectedModule(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiMove} className="w-4 h-4 text-netflix-light" />
                        <span className="text-white font-medium">{module.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-netflix-light text-sm">
                          {module.lessons.length} lessons
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeModule(index)
                          }}
                          className="p-1 rounded hover:bg-red-500 transition-colors"
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Module Editor */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-netflix-black rounded-lg p-6"
            >
              {modules[selectedModule] && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <input
                        type="text"
                        value={modules[selectedModule].title}
                        onChange={(e) => updateModule(selectedModule, 'title', e.target.value)}
                        className="text-2xl font-bold text-white bg-transparent border-none outline-none"
                      />
                      <p className="text-netflix-light">
                        {modules[selectedModule].lessons.length} lessons
                      </p>
                    </div>
                    
                    <button
                      onClick={() => addLesson(selectedModule)}
                      className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      <span>Add Lesson</span>
                    </button>
                  </div>

                  {/* Lessons */}
                  <div className="space-y-4">
                    {modules[selectedModule].lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="border border-netflix-gray rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-netflix-gray rounded-lg">
                            <SafeIcon icon={getLessonIcon(lesson.type)} className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => updateLesson(selectedModule, lessonIndex, 'title', e.target.value)}
                              className="bg-netflix-gray border border-netflix-light rounded px-3 py-2 text-white"
                              placeholder="Lesson title"
                            />
                            
                            <select
                              value={lesson.type}
                              onChange={(e) => updateLesson(selectedModule, lessonIndex, 'type', e.target.value)}
                              className="bg-netflix-gray border border-netflix-light rounded px-3 py-2 text-white"
                            >
                              <option value="video">Video</option>
                              <option value="text">Text</option>
                              <option value="quiz">Quiz</option>
                            </select>
                            
                            <input
                              type="text"
                              value={lesson.duration}
                              onChange={(e) => updateLesson(selectedModule, lessonIndex, 'duration', e.target.value)}
                              className="bg-netflix-gray border border-netflix-light rounded px-3 py-2 text-white"
                              placeholder="Duration"
                            />
                          </div>
                          
                          <button
                            onClick={() => removeLesson(selectedModule, lessonIndex)}
                            className="p-2 rounded hover:bg-red-500 transition-colors"
                          >
                            <SafeIcon icon={FiTrash2} className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {modules[selectedModule].lessons.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-netflix-light">No lessons yet. Add your first lesson to get started.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseBuilder