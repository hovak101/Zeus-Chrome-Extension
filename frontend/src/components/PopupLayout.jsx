function PopupLayout(props) {
    return (
      <div>
        <div className="flex flex-row w-full justify-between">
          <span>LAV</span>
          <div className="flex flex-row">
            <button title="Report" >Report</button>
            <button title="Settings">Settings</button>
          </div>
        </div>

        <div>
          {props.children}
        </div>
      </div>
    );
}

export default PopupLayout;