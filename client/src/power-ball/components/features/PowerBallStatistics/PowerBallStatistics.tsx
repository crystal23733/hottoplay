'use client';

import usePowerBallStatistics from '@/power-ball/hooks/usePowerBallStatistics';
import MESSAGES from './constants/messages';
import NumberGrid from '../../atoms/NumberGrid/NumberGrid';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/ui/alert';
import NumberStatCard from '../../atoms/NumberStatCard/NumberStatCard';
import CombinationStatCard from '../../organisms/CombinationStatCard/CombinationStatCard';

/**
 * 파워볼 통계 컴포넌트
 * @returns 파워볼 통계 컴포넌트
 * @example
 * <PowerBallStatistics />
 */
const PowerBallStatistics = () => {
  const { selectedNumbers, data, loading, error, handleNumberSelect } = usePowerBallStatistics();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">{MESSAGES.INSTRUCTION}</h2>
        <NumberGrid
          selectedNumbers={selectedNumbers}
          onNumberSelect={handleNumberSelect}
          disabled={loading}
        />
      </div>

      {/* 로딩 상태 */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-center gap-2 py-8 text-primary"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-medium">{MESSAGES.LOADING}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 에러 메시지 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{MESSAGES.ERROR}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 통계 결과 */}
      {data && (
        <div className="grid gap-6">
          {/* 개별 번호 통계 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {data.numberStats.map((stat, index) => (
              <motion.div
                key={`${stat.number}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <NumberStatCard stat={stat} />
              </motion.div>
            ))}
          </motion.div>

          {/* 조합 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CombinationStatCard stats={data.combinationStats} selectedNumbers={selectedNumbers} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PowerBallStatistics;
