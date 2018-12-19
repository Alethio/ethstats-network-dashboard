import React from 'react';

const SpinnerSvg = () => {
  return (
    <div>
      <svg width="10px" height="18px" viewBox="0 0 10 18" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-44.000000, -116.000000)">
            <g transform="translate(0.000000, 97.000000)">
              <g transform="translate(37.000000, 20.000000)">
                <g>
                  <g>
                    <g>
                      <path d="M9.49047922,15.8598587 C13.1970928,15.1582805 16,11.906056 16,8 C16,3.581722 12.4137723,0 7.9899363,0" id="Oval" stroke="" strokeWidth="2" strokeLinecap="round"></path>
                      <circle id="Oval-2" cx="8" cy="8" r="8">
                        {/* <animateTransform attributeType="xml"*/}
                        {/* attributeName="transform"*/}
                        {/* type="rotate"*/}
                        {/* from="0 180 50"*/}
                        {/* to="360 180 50"*/}
                        {/* dur="4s"*/}
                        {/* repeatCount="indefinite"/>*/}
                      </circle>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SpinnerSvg;
