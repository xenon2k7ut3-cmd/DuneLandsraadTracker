import React, { useEffect, useState } from 'react';
import './VendorSidebar.css';
import { vendorImages } from '../data/vendorImages';

const VendorSidebar = ({ selectedHouse }) => {
  const [loadErrors, setLoadErrors] = useState({ map: false, vendor: false });

  const images = selectedHouse ? (vendorImages[selectedHouse.name] || {}) : {};
  const { mapCandidates = [], vendorCandidates = [], referenceUrl } = images;

  const [resolvedMapSrc, setResolvedMapSrc] = useState(null);
  const [resolvedVendorSrc, setResolvedVendorSrc] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, src: null, alt: '' });

  useEffect(() => {
    setResolvedMapSrc(null);
    setResolvedVendorSrc(null);
    setLoadErrors({ map: false, vendor: false });

    if (!selectedHouse) {
      return;
    }

    // Try sequentially to resolve a working map image
    let mapIndex = 0;
    const tryNextMap = () => {
      if (mapIndex >= mapCandidates.length) {
        setLoadErrors(prev => ({ ...prev, map: true }));
        return;
      }
      const candidate = mapCandidates[mapIndex++];
      const img = new Image();
      img.onload = () => setResolvedMapSrc(candidate);
      img.onerror = tryNextMap;
      img.src = candidate;
    };
    if (mapCandidates.length > 0) tryNextMap(); else setLoadErrors(prev => ({ ...prev, map: true }));

    // Try sequentially to resolve a working vendor image
    let vendorIndex = 0;
    const tryNextVendor = () => {
      if (vendorIndex >= vendorCandidates.length) {
        setLoadErrors(prev => ({ ...prev, vendor: true }));
        return;
      }
      const candidate = vendorCandidates[vendorIndex++];
      const img = new Image();
      img.onload = () => setResolvedVendorSrc(candidate);
      img.onerror = tryNextVendor;
      img.src = candidate;
    };
    if (vendorCandidates.length > 0) tryNextVendor(); else setLoadErrors(prev => ({ ...prev, vendor: true }));
  }, [selectedHouse?.name]);

  const openLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, open: false }));
    // Delay clearing src to allow transition
    setTimeout(() => setLightbox({ open: false, src: null, alt: '' }), 200);
  };

  return (
    <aside className="vendor-sidebar">
      <div className="vendor-sidebar-inner">
        <h3 className="vendor-title">{selectedHouse ? `${selectedHouse.name} Vendor` : 'Vendor'}</h3>

        <div className="vendor-image-group">
          <div className="vendor-image-card">
            <div className="vendor-image-label">Map Location</div>
            {selectedHouse && resolvedMapSrc && !loadErrors.map ? (
              <img 
                className="vendor-image" 
                src={resolvedMapSrc}
                alt={`${selectedHouse.name} vendor map`}
                onClick={() => openLightbox(resolvedMapSrc, `${selectedHouse.name} vendor map`)}
              />
            ) : (
              <div className="vendor-image missing">Map image not available</div>
            )}
          </div>

          <div className="vendor-image-card">
            <div className="vendor-image-label">Environment View</div>
            {selectedHouse && resolvedVendorSrc && !loadErrors.vendor ? (
              <img 
                className="vendor-image" 
                src={resolvedVendorSrc}
                alt={`${selectedHouse.name} vendor environment`}
                onClick={() => openLightbox(resolvedVendorSrc, `${selectedHouse.name} vendor environment`)}
              />
            ) : (
              <div className="vendor-image missing">Environment image not available</div>
            )}
          </div>
        </div>

        {selectedHouse && referenceUrl && (
          <a className="vendor-reference" href={referenceUrl} target="_blank" rel="noreferrer">
            Source guide
          </a>
        )}
      </div>

      {lightbox.src && (
        <div 
          className={`vendor-lightbox-overlay ${lightbox.open ? 'visible' : ''}`}
          onClick={closeLightbox}
        >
          <div className="vendor-lightbox-content">
            <img className="vendor-lightbox-image" src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      )}
    </aside>
  );
};

export default VendorSidebar;


