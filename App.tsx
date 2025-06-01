
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import PlatformSelector from './components/PlatformSelector';
import DashboardCard from './components/DashboardCard';
import FollowerGrowthChart from './components/FollowerGrowthChart';
import EngagementChart from './components/EngagementChart';
import RecentPostsFeed from './components/RecentPostsFeed';
import GeminiAnalysis from './components/GeminiAnalysis';
import { SocialPlatform, PlatformData } from './types';
import { getPlatformData } from './services/mockDataService';
import { DEFAULT_PLATFORM } from './constants';
import { UsersIcon, ChartBarIcon, ArrowTrendingUpIcon, DocumentTextIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(DEFAULT_PLATFORM);
  const [platformData, setPlatformData] = useState<PlatformData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlatformData = useCallback(async (platform: SocialPlatform) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPlatformData(platform);
      setPlatformData(data);
    } catch (err) {
      setError("Failed to load platform data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlatformData(selectedPlatform);
  }, [selectedPlatform, fetchPlatformData]);

  const handlePlatformChange = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };


  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <PlatformSelector selectedPlatform={selectedPlatform} onPlatformChange={handlePlatformChange} />
          </div>

          {isLoading && (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg text-textSecondary">Loading Dashboard Data...</p>
            </div>
          )}
          {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}
          
          {!isLoading && !error && platformData && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <section>
                <h2 className="text-2xl font-semibold text-textPrimary mb-4">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <DashboardCard 
                    title="Total Followers" 
                    value={formatNumber(platformData.overallStats.followers)} 
                    icon={<UsersIcon className="w-6 h-6" />}
                    trend={`+${(Math.random()*5).toFixed(1)}% this month`}
                    trendColor="text-green-500"
                  />
                  <DashboardCard 
                    title="Engagement Rate" 
                    value={`${platformData.overallStats.engagementRate}%`}
                    icon={<ChartBarIcon className="w-6 h-6" />}
                    description="Avg. per post"
                  />
                  <DashboardCard 
                    title="Total Reach" 
                    value={formatNumber(platformData.overallStats.reach)}
                    icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                    trend={`+${(Math.random()*8).toFixed(1)}% this month`}
                    trendColor="text-green-500"
                  />
                  <DashboardCard 
                    title="Total Posts" 
                    value={formatNumber(platformData.overallStats.posts)}
                    icon={<DocumentTextIcon className="w-6 h-6" />}
                  />
                </div>
              </section>

              {/* Charts Section */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FollowerGrowthChart data={platformData.followerTrend} isLoading={isLoading} />
                <EngagementChart data={platformData.engagementBreakdown} isLoading={isLoading} title="Engagement Types" />
              </section>
              
              {/* Gemini AI Analysis */}
              <section>
                 <GeminiAnalysis platformData={platformData} />
              </section>

              {/* Recent Activity */}
              <section>
                <RecentPostsFeed posts={platformData.recentPosts} isLoading={isLoading} />
              </section>

            </div>
          )}
        </div>
      </main>
      <footer className="bg-card text-center py-4 mt-8 border-t border-gray-200">
        <p className="text-sm text-textSecondary">&copy; {new Date().getFullYear()} Social Media Insights Dashboard. Powered by AI.</p>
      </footer>
    </div>
  );
};

export default App;
