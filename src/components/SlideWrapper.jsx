import { motion } from 'framer-motion'

export default function SlideWrapper({ children, className = '', scroll = false }) {
  return (
    <motion.div
      className={`slide-content flex flex-col items-center justify-center px-6 py-6 ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className={`flex w-full max-w-6xl flex-col items-center ${
          scroll ? 'max-h-[calc(100vh-110px)] overflow-y-auto overflow-x-hidden pr-1' : ''
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
