import React, { useState } from 'react'
import { bannerStyles, customStyles } from '../assets/dummyStyles'
import { Sparkles, X } from 'lucide-react'
import bannerImg from '../assets/Bannerimage.jpg'
import video from '../assets/BannerVideo.mp4'

const Banner = () => {
    const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="pt-20"> {/* Changed pt-100 to pt-20 */}
      <div className={bannerStyles.mainContent}>
        <div className={bannerStyles.grid}>
          <div className={bannerStyles.leftContent}>
            <span className={bannerStyles.badge}>
              <Sparkles className={bannerStyles.badgeIcon} />
              New Features Available
            </span>
              <h1 className={bannerStyles.heading}> 
                <span className={bannerStyles.headingSpan1}>Build Amazing</span>
                <span className={bannerStyles.headingSpan2}>Digital Product</span>

              </h1>
              <p className={bannerStyles.description}> Hello everyone beleive the process</p>
              <div className={bannerStyles.buttonsContainer}>
                <a href="/courses" className= {bannerStyles.buttonGetStarted}>
                Get Started
                </a>
                <button onClick={()=>setShowVideo(true)}>
                    View Demo

                </button>
              </div>
          </div>  
          <div className={bannerStyles.imageContainer}>
            <img src={bannerImg} alt="Banner" className={bannerStyles.image}/>

          </div>

        </div>
      </div>
      {showVideo &&(
        <div className={bannerStyles.videoModal.overlay}>
            <div className={bannerStyles.videoModal.container}>
              <iframe 
              src={video}
              className={bannerStyles.videoModal.iframe}
              title="Demo Video"
              allow="autoplay;encrypted-media"
              allowFullScreen></iframe>

              <button onClick={() => setShowVideo(false)} className={bannerStyles.videoModal.closeButton}>
                <span>
                    <X className={bannerStyles.videoModal.closeIcon}></X>

                </span>
              </button>
            </div>
        </div>
      ) }
      <style jsx>{customStyles}
      </style>
    </div>
  )
}

export default Banner
