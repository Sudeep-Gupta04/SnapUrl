
import Graph from "../Graph/Graph";
import "./DashboardLayout.css";
import { useStoreContext } from "../../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../../hooks/useQuery";
import ShorternPopUp from "../ShorternPopUP";
import { useState, useMemo } from "react";
import ShorternUrlList from "../ShorternUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { 
  FaLink, 
  FaChartLine, 
  FaCalendarAlt, 
  FaPlus,
  FaExternalLinkAlt,
  FaCopy,
  FaRegCopy
} from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";

const DashboardLayout = () => {
  const [refetched, setRefetched] = useState(false);
  const [shorternPopUp, setShorternPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigator = useNavigate();
  const { token } = useStoreContext();

  function onError() {
    navigator("/error")
  }

  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(
    token,
    onError
  );

  const { isLoading: isUrlLoading, data: myUrls, refetch } = useFetchMyShortUrls(
    token,
    onError
  );

  // Calculate statistics
  const stats = useMemo(() => {
    if (!myUrls) return null;
    
    const totalUrls = myUrls.length;
    const totalClicksCount = myUrls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
    const activeUrls = myUrls.filter(url => url.clickCount > 0).length;
    const avgClicks = totalUrls > 0 ? (totalClicksCount / totalUrls).toFixed(1) : 0;
    
    return {
      totalUrls,
      totalClicks: totalClicksCount,
      activeUrls,
      avgClicks
    };
  }, [myUrls]);

  const handleRefetch = () => {
    refetch();
  };

  const handleCreateNew = () => {
    setShorternPopup(true);
  };

  return (
    <div className="dashboard-container">
      {loader || isUrlLoading ? (
        <Loader />
      ) : (
        <div className="dashboard-content">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="header-content">
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">Manage and track your shortened URLs</p>
            </div>
            <button 
              className="create-button"
              onClick={handleCreateNew}
            >
              <FaPlus />
              <span>Create New URL</span>
            </button>
          </div>

          {/* Statistics Cards */}
          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon total-urls">
                  <FaLink />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.totalUrls}</h3>
                  <p className="stat-label">Total URLs</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon total-clicks">
                  <FaChartLine />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.totalClicks}</h3>
                  <p className="stat-label">Total Clicks</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon active-urls">
                  <FaExternalLinkAlt />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.activeUrls}</h3>
                  <p className="stat-label">Active URLs</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon avg-clicks">
                  <MdAnalytics />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.avgClicks}</h3>
                  <p className="stat-label">Avg. Clicks</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'urls' ? 'active' : ''}`}
              onClick={() => setActiveTab('urls')}
            >
              My URLs
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-section">
                <div className="graph-container">
                  <div className="graph-header">
                    <h2>Click Analytics</h2>
                    <p>Track your URL performance over time</p>
                  </div>
                  
                  {totalClicks && Object.keys(totalClicks).length === 0 ? (
                    <div className="no-data-container">
                      <div className="no-data-icon">
                        <FaChartLine />
                      </div>
                      <h3 className="no-data-title">No Analytics Data Yet</h3>
                      <p className="no-data-subtitle">
                        Create your first shortened URL and start tracking clicks to see analytics here
                      </p>
                      <button 
                        className="no-data-action"
                        onClick={handleCreateNew}
                      >
                        Create Your First URL
                      </button>
                    </div>
                  ) : (
                    <div className="graph-wrapper">
                      <Graph graphData={totalClicks} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'urls' && (
              <div className="urls-section">
                <div className="urls-header">
                  <h2>My Shortened URLs</h2>
                  <p>Manage and track all your shortened URLs</p>
                </div>
                
                {!isUrlLoading && myUrls && myUrls.length > 0 ? (
                  <ShorternUrlList data={myUrls} />
                ) : (
                  <div className="no-urls-container">
                    <div className="no-urls-icon">
                      <FaLink />
                    </div>
                    <h3 className="no-urls-title">No URLs Created Yet</h3>
                    <p className="no-urls-subtitle">
                      Start by creating your first shortened URL to track and manage your links
                    </p>
                    <button 
                      className="no-urls-action"
                      onClick={handleCreateNew}
                    >
                      Create Your First URL
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <ShorternPopUp
        open={shorternPopUp}
        setOpen={setShorternPopup}
        refetch={refetched}
      />
    </div>
  );
};

export default DashboardLayout; 