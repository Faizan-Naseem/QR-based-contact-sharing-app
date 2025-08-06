
import { useState } from 'react'
import './App.css'

export default function App() {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    title: '',
    website: ''
  })
  
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showQR, setShowQR] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}
END:VCARD`
    return vcard
  }

  const generateQRCode = () => {
    if (!contactInfo.name || !contactInfo.phone) {
      alert('Please fill in at least name and phone number')
      return
    }

    const vcard = generateVCard()
    const encodedVCard = encodeURIComponent(vcard)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedVCard}`
    
    setQrCodeUrl(qrUrl)
    setShowQR(true)
  }

  const downloadQRCode = () => {
    const link = document.createElement('a')
    link.download = `${contactInfo.name.replace(/\s+/g, '_')}_contact_qr.png`
    link.href = qrCodeUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareContact = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${contactInfo.name}'s Contact`,
          text: `Contact details for ${contactInfo.name}`,
          url: qrCodeUrl
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(qrCodeUrl)
      alert('QR Code URL copied to clipboard!')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📱 Smart Contact Sharing</h1>
        <p>Create and share your contact details instantly with QR codes</p>
      </header>

      <main className="main-content">
        {!showQR ? (
          <div className="contact-form">
            <h2>Enter Your Contact Details</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleInputChange}
                  placeholder="Faizan naseem"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+91 999999999"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="sample@example.com"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={contactInfo.company}
                  onChange={handleInputChange}
                  placeholder="ABC Corporation"
                />
              </div>

              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={contactInfo.title}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={contactInfo.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <button type="button" onClick={generateQRCode} className="generate-btn">
                🔗 Generate QR Code
              </button>
            </form>
          </div>
        ) : (
          <div className="qr-display">
            <h2>Your Contact QR Code</h2>
            <div className="contact-preview">
              <h3>{contactInfo.name}</h3>
              {contactInfo.title && <p className="title">{contactInfo.title}</p>}
              {contactInfo.company && <p className="company">{contactInfo.company}</p>}
              <p className="phone">📞 {contactInfo.phone}</p>
              {contactInfo.email && <p className="email">✉️ {contactInfo.email}</p>}
              {contactInfo.website && <p className="website">🌐 {contactInfo.website}</p>}
            </div>
            
            <div className="qr-code-container">
              <img src={qrCodeUrl} alt="Contact QR Code" className="qr-code" />
              <p className="qr-instruction">
                📱 Scan this QR code to save contact details instantly
              </p>
            </div>

            <div className="action-buttons">
              <button onClick={downloadQRCode} className="download-btn">
                ⬇️ Download QR Code
              </button>
              <button onClick={shareContact} className="share-btn">
                📤 Share
              </button>
              <button onClick={() => setShowQR(false)} className="edit-btn">
                ✏️ Edit Details
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="benefits">
          <h3>Why Use Smart Contact Sharing?</h3>
          <div className="benefit-grid">
            <div className="benefit">
              <span className="icon">🌱</span>
              <h4>Eco-Friendly</h4>
              <p>No paper cards needed</p>
            </div>
            <div className="benefit">
              <span className="icon">⚡</span>
              <h4>Instant</h4>
              <p>Share in seconds</p>
            </div>
            <div className="benefit">
              <span className="icon">📱</span>
              <h4>Modern</h4>
              <p>Works on all devices</p>
            </div>
            <div className="benefit" id ="icon-direct">
              <span className="icon" >💾</span>
              <h4>Direct Save</h4>
              <p>Saves to contacts app</p>
            </div>
{/* //extra icons */}
            <div className="benefit" id ="icon-direct">
              <span className="icon" >💾</span>
              <h4>Direct Save</h4>
              <p>Saves to contacts app</p>
            </div>
            <div className="benefit" id ="icon-direct">
              <span className="icon" >💾</span>
              <h4>Direct Save</h4>
              <p>Saves to contacts app</p>
            </div>

            
{/* ... */}

          </div>
        </div>
      </footer>
    </div>
  )
}
