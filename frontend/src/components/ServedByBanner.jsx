import React, { useState, useEffect } from 'react';
import { getServedByInfo } from '../services/api';

export default function ServedByBanner({ lang }) {
  const [serverInfo, setServerInfo] = useState({
    nama: 'Adam Nugraha',
    nim: '103012400280',
    route_id: 'm1',
  });

  useEffect(() => {
    let mounted = true;
    getServedByInfo().then((res) => {
      if (mounted && res?.data) {
        setServerInfo({
          nama: res.data.nama || 'Adam Nugraha',
          nim: res.data.nim || '103012400280',
          route_id: res.data.route_id || 'm1',
        });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="served-by-banner" aria-label="Server Identity Banner">
      <div className="served-by-pill">
        <span className="served-dot" />
        <span className="served-text">
          {lang === 'ID' ? 'Anda dilayani oleh laman' : 'You are served by'}{' '}
          <strong className="served-name">{serverInfo.nama}</strong>{' '}
          <span className="served-nim">({serverInfo.nim})</span>
        </span>
        <span className="served-route-tag">{serverInfo.route_id.toUpperCase()}</span>
      </div>
    </div>
  );
}
