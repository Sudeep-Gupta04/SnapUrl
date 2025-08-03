import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Hourglass } from "react-loader-spinner";
import dayjs from "dayjs";
import "./ShortenItem.css";
import api from "../../api/api";
import { useStoreContext } from "../../contextApi/ContextApi";
import Graph from "./Graph/Graph";

function ShortenItem({ originalurl, shorturl, clickCount, createdDate }) {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN || window.location.origin;

  originalurl = originalurl.replace(/\/$/, "")

  // Convert date array to proper date format
  const formatDate = (dateData) => {
    if (Array.isArray(dateData)) {
      // Handle array format: [year, month, day, hour, minute, second, millisecond]
      const [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0] = dateData;
      return new Date(year, month - 1, day, hour, minute, second, millisecond);
    } else if (typeof dateData === 'string') {
      return new Date(dateData);
    } else {
      return new Date(dateData);
    }
  };

  const formattedDate = formatDate(createdDate);

  const analyticsHandler = (shorturl) => {
    if (!analyticToggle) {
      setSelectedUrl(shorturl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01&endDate=2025-12-31`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl("");
    } catch (error) {
      navigate("/error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  const handleRedirect = () => {
    window.open(shortUrl, '_blank');
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Create the correct short URL
  const getShortUrl = () => {
    return `http://localhost:3000/${shorturl}`;
  };
  
  const shortUrl = getShortUrl();

  return (
    <div className="shorten-item-container">
      <div className="url-card">
        <div className="url-content">
          <div className="url-header">
            <div className="short-url-section">
              <div className="url-label">Short URL</div>
              <div className="short-url">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-link"
                >
                  {shortUrl}
                </a>
                <FaExternalLinkAlt className="external-link-icon" />
              </div>
            </div>
            
            <div className="action-buttons">
              <CopyToClipboard
                onCopy={handleCopy}
                text={shortUrl}
              >
                <button className={`copy-button ${isCopied ? 'copied' : ''}`}>
                  {isCopied ? <LiaCheckSolid /> : <IoCopy />}
                  <span>{isCopied ? "Copied!" : "Copy"}</span>
                </button>
              </CopyToClipboard>

              <button 
                onClick={handleRedirect}
                className="redirect-button"
              >
                <FaExternalLinkAlt />
                <span>Visit URL</span>
              </button>

              <button
                onClick={() => analyticsHandler(shorturl)}
                className={`analytics-button ${analyticToggle ? 'active' : ''}`}
              >
                <MdAnalytics />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          <div className="url-details">
            <div className="original-url-section">
              <div className="url-label">Original URL</div>
              <div className="original-url">
                <span>{originalurl}</span>
              </div>
            </div>

            <div className="url-stats">
              <div className="stat-item">
                <MdOutlineAdsClick className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">{clickCount}</span>
                  <span className="stat-label">
                    {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
                  </span>
                </div>
              </div>

              <div className="stat-item">
                <FaRegCalendarAlt className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">{dayjs(formattedDate).format("MMM DD")}</span>
                  <span className="stat-label">{dayjs(formattedDate).format("YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`analytics-section ${analyticToggle ? "show" : "hide"}`}>
          {loader ? (
            <div className="loader-wrapper">
              <Hourglass height="50" width="50" colors={["#667eea", "#764ba2"]} />
              <p>Loading analytics...</p>
            </div>
          ) : (
            <>
              {analyticsData.length === 0 ? (
                <div className="no-analytics-data">
                  <div className="no-data-icon">
                    <MdAnalytics />
                  </div>
                  <h3>No Analytics Data</h3>
                  <p>Share your link to start seeing analytics here</p>
                </div>
              ) : (
                <div className="analytics-graph">
                  <Graph graphData={analyticsData} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShortenItem;
