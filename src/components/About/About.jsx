import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 className="display-2 text-center my-3">About Creator</h1>
      <div className="row mt-5">
        <div className="col-md-5">
          <img src="" alt="" className="border" width="100%" />
        </div>
        <div className="col-md-7 py-0 px-4">
          <h1 className="display-2 py-0">Raman Sharma</h1>
          <p className="lead">Passionated Web Developer</p>

          <p className="mt-5 py-1 px-2 bg-dark text-white">Follow On:-</p>
          <table className="mx-auto">
            <tr>
              <td>
                <i className="fa fa-youtube"></i> Youtube
              </td>
              <td className="pl-2">
                <a
                  href="https://www.youtube.com/fullyworldwebtutorials"
                  target="_blank"
                  className="px-5"
                  rel="noreferrer">
                  Fullyworld Web Tutorials
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-linkedin"></i> LinkedIn
              </td>
              <td className="pl-2">
                <a
                  href="https://www.linkedin.com/in/raman-sharma-2169b0139/"
                  target="_blank"
                  className="px-5"
                  rel="noreferrer">
                  Raman Sharma
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-github"></i> Github
              </td>
              <td className="pl-2">
                <a
                  href="https://github.com/RamanSharma100"
                  target="_blank"
                  className="px-5"
                  rel="noreferrer">
                  Raman Sharma
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-codepen"></i> Codepen
              </td>
              <td className="pl-2">
                <a
                  href="https://codepen.io/Fullyworld_Web_Tutorials/"
                  target="_blank"
                  className="px-5"
                  rel="noreferrer">
                  Fullyworld Web Tutorials
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-instagram"></i> Instagram
              </td>
              <td className="pl-2">
                <a
                  href="https://instagram.com/fullyworld_web_tutorials"
                  target="_blank"
                  className="px-5"
                  rel="noreferrer">
                  Raman Sharma (@fullyworld_web_tutorials)
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default About;
