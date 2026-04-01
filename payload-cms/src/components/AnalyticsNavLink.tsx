import React from 'react'

const AnalyticsNavLink = () => (
  <a
    href="/admin/analytics"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 24px',
      color: 'inherit',
      textDecoration: 'none',
      fontSize: 13,
      opacity: 0.85,
    }}
  >
    <span>📊</span>
    <span>Analytics</span>
  </a>
)

export default AnalyticsNavLink
