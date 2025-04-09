function PopupLayout(props) {
    return (
      <div style={{
        width: '300px',
        border: '1px solid black',
        padding: '8px',
        fontFamily: 'sans-serif'
      }}>
        {/* Nav Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid black',
          paddingBottom: '4px',
          marginBottom: '8px'
        }}>
          <span style={{ fontWeight: 'bold' }}>LAV</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button title="Report" style={{ cursor: 'pointer' }}>📩</button>
            <button title="Settings" style={{ cursor: 'pointer' }}>⚙️</button>
          </div>
        </div>
  
        {/* Dynamic content goes here */}
        <div>
          {props.children}
        </div>
      </div>
    );
}

export default PopupLayout;