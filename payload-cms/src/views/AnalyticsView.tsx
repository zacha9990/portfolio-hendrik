import React, { useEffect, useState } from 'react'
import { useAuth } from 'payload/components/utilities'

type Doc = {
  page: string
  country: string
  country_code: string
  city: string
  createdAt: string
}

const styles = {
  wrap: { padding: 32, maxWidth: 1100, margin: '0 auto', fontFamily: 'sans-serif' } as const,
  heading: { fontSize: 24, fontWeight: 700, marginBottom: 8 } as const,
  subtext: { color: '#666', fontSize: 14, marginBottom: 28 } as const,
  cards: { display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' as const },
  card: {
    background: '#f4f4f5',
    borderRadius: 10,
    padding: '16px 28px',
    minWidth: 130,
    textAlign: 'center' as const,
  },
  cardNum: { fontSize: 34, fontWeight: 700, lineHeight: 1 } as const,
  cardLabel: { color: '#666', marginTop: 6, fontSize: 13 } as const,
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 } as const,
  box: { border: '1px solid #e4e4e7', borderRadius: 10, overflow: 'hidden' } as const,
  boxHead: { padding: '12px 16px', borderBottom: '1px solid #e4e4e7', fontWeight: 600, fontSize: 14 } as const,
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13 },
  th: { textAlign: 'left' as const, padding: '8px 16px', borderBottom: '2px solid #e4e4e7', color: '#888', fontWeight: 600 },
  thRight: { textAlign: 'right' as const, padding: '8px 16px', borderBottom: '2px solid #e4e4e7', color: '#888', fontWeight: 600 },
  td: { padding: '8px 16px', borderBottom: '1px solid #f4f4f5', color: '#222' } as const,
  tdRight: { padding: '8px 16px', borderBottom: '1px solid #f4f4f5', color: '#222', textAlign: 'right' as const },
  code: { fontFamily: 'monospace', background: '#f4f4f5', padding: '2px 6px', borderRadius: 4, fontSize: 12 } as const,
  bar: { display: 'inline-block', background: '#6366f1', borderRadius: 3, height: 10, marginLeft: 8, verticalAlign: 'middle' as const },
}

const AnalyticsView = () => {
  const { token } = useAuth()
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!token) return
    fetch('/api/page-views?limit=10000&sort=-createdAt', {
      headers: { Authorization: `JWT ${token}` },
    })
      .then(r => r.json())
      .then(json => {
        setDocs(json.docs || [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [token])

  const byPage = docs.reduce((acc, v) => {
    acc[v.page] = (acc[v.page] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const byCountry = docs.reduce((acc, v) => {
    const key = v.country || 'Unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topPages = Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const topCountries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const maxPageCount = topPages[0]?.[1] || 1
  const maxCountryCount = topCountries[0]?.[1] || 1

  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>Analytics</h1>
      <p style={styles.subtext}>Page visit statistics for your portfolio.</p>

      {loading && <p style={{ color: '#888' }}>Loading...</p>}
      {error && <p style={{ color: '#e00' }}>Failed to load data.</p>}

      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <div style={styles.cards}>
            <div style={styles.card}>
              <div style={styles.cardNum}>{docs.length.toLocaleString()}</div>
              <div style={styles.cardLabel}>Total Views</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardNum}>{Object.keys(byPage).length}</div>
              <div style={styles.cardLabel}>Pages Tracked</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardNum}>{Object.keys(byCountry).length}</div>
              <div style={styles.cardLabel}>Countries</div>
            </div>
          </div>

          {/* Top Pages + Countries */}
          <div style={styles.grid}>
            <div style={styles.box}>
              <div style={styles.boxHead}>Top Pages</div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Page</th>
                    <th style={styles.thRight}>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.length === 0 && (
                    <tr><td colSpan={2} style={{ ...styles.td, color: '#aaa', textAlign: 'center' }}>No data yet</td></tr>
                  )}
                  {topPages.map(([page, count]) => (
                    <tr key={page}>
                      <td style={styles.td}>
                        <span style={styles.code}>{page}</span>
                        <span style={{ ...styles.bar, width: Math.max(4, (count / maxPageCount) * 80) }} />
                      </td>
                      <td style={styles.tdRight}>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.box}>
              <div style={styles.boxHead}>Top Countries</div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Country</th>
                    <th style={styles.thRight}>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {topCountries.length === 0 && (
                    <tr><td colSpan={2} style={{ ...styles.td, color: '#aaa', textAlign: 'center' }}>No data yet</td></tr>
                  )}
                  {topCountries.map(([country, count]) => (
                    <tr key={country}>
                      <td style={styles.td}>
                        {country}
                        <span style={{ ...styles.bar, width: Math.max(4, (count / maxCountryCount) * 80) }} />
                      </td>
                      <td style={styles.tdRight}>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Visits */}
          <div style={styles.box}>
            <div style={styles.boxHead}>Recent Visits (last 20)</div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Page</th>
                  <th style={styles.th}>Country</th>
                  <th style={styles.th}>City</th>
                  <th style={styles.thRight}>Time</th>
                </tr>
              </thead>
              <tbody>
                {docs.slice(0, 20).map((doc, i) => (
                  <tr key={i}>
                    <td style={styles.td}><span style={styles.code}>{doc.page}</span></td>
                    <td style={styles.td}>{doc.country || '—'}</td>
                    <td style={styles.td}>{doc.city || '—'}</td>
                    <td style={styles.tdRight}>{new Date(doc.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default AnalyticsView
