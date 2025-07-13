import { React, useEffect } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const sendEmail = async (emailData) => {
    try {
      const response = await fetch('https://portfolio-dggz.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const emailData = {
      fullName: formData.get('full-name'),
      email: formData.get('email'),
      phoneNumber: formData.get('phone-number'),
      budget: formData.get('budget'),
      // file: formData.get('file'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    // const requiredFields = ['full-name', 'email', 'subject', 'message'];
    // const isValid = requiredFields.every((field) => {
    //   const value = formData.get(field);
    //   if (!value) {
    //     document.getElementById(field).classList.add('error');
    //     return false;
    //   } else {
    //     document.getElementById(field).classList.remove('error');
    //     return true;
    //   }
    // });
    // if (!isValid) {
    //   document.getElementById('required-msg').style.display = 'block';
    //   return;
    // } else {
    //   document.getElementById('required-msg').style.display = 'none';
    // }
    console.log('Form data:', emailData);
    sendEmail(emailData);
  };
  document.getElementById('budget')?.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/, '');
  });
  return (
    <>

      <div class="page-loader">
        <div class="bounceball"></div>
      </div>

      <span class="icon-menu">
        <span class="bar"></span>
        <span class="bar"></span>
      </span>

      {/* <div class="global-color">
        <span class="setting-toggle">
          <i class="las la-cog"></i>
        </span>
        <div class="inner">
          <div class="overlay"></div>
          <div class="global-color-option">
            <span class="close-settings">
              <i class="las la-times"></i>
            </span>
            <h2>Configuration</h2>
            <div class="global-color-option-inner">
              <p>Colors</p>
              <div class="color-boxed">
                <a href="#" class="clr-active" onclick="color1();"></a>
                <a href="#" onclick="color2();"></a>
                <a href="#" onclick="color3();"></a>
                <a href="#" onclick="color4();"></a>
                <a href="#" onclick="color5();"></a>
                <a href="#" onclick="color6();"></a>
                <a href="#" onclick="color7();"></a>
                <a href="#" onclick="color8();"></a>
              </div>

              <p>THREE DIMENSIONAL SHAPES</p>
              <ul class="themes">
                <li><a href="./home1.html">Earth Lines Sphere</a></li>
                <li><a href="./home2.html">3D Abstract Ball</a></li>
                <li><a href="./home3.html">Water Waves</a></li>
                <li><a href="./home4.html">Liquids Wavy</a></li>
                <li><a href="./home6.html">Solid Color</a></li>
                <li><a href="./home5.html">Simple Strings</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      <div class="responsive-sidebar-menu">
        <div class="overlay"></div>
        <div class="sidebar-menu-inner">
          <div class="menu-wrap">
            <p>Menu</p>
            <ul class="menu scroll-nav-responsive d-flex">
              <li>
                <a class="scroll-to" href="#home">
                  <i class="las la-home"></i> <span>Home</span>
                </a>
              </li>
              <li>
                <a class="scroll-to" href="#about">
                  <i class="lar la-user"></i> <span>About</span>
                </a>
              </li>
              <li>
                <a class="scroll-to" href="#resume">
                  <i class="las la-briefcase"></i> <span>Resume</span>
                </a>
              </li>
              <li>
                <a class="scroll-to" href="#services">
                  <i class="las la-stream"></i> <span>Services</span>
                </a>
              </li>
              <li>
                <a class="scroll-to" href="#skills">
                  <i class="las la-shapes"></i> <span>Skills</span>
                </a>
              </li>
              {/* <li>
                <a class="scroll-to" href="#portfolio">
                  <i class="las la-grip-vertical"></i> <span>Portfolios</span>
                </a>
              </li> */}
              <li>
                <a class="scroll-to" href="#contact">
                  <i class="las la-envelope"></i> <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>


          <div class="sidebar-social">
            <p>Social</p>
            <ul class="social-links d-flex align-items-center">
              <li>
                <a href=""><i class="lab la-twitter"></i></a>
              </li>
              <li>
                <a href=""><i class="lab la-dribbble"></i></a>
              </li>
              <li>
                <a href=""><i class="lab la-instagram"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul class="menu scroll-nav d-flex">
        <li>
          <a class="scroll-to" href="#home">
            <span>Home</span> <i class="las la-home"></i>
          </a>
        </li>
        <li>
          <a class="scroll-to" href="#about">
            <span>About</span> <i class="lar la-user"></i>
          </a>
        </li>
        <li>
          <a class="scroll-to" href="#resume">
            <span>Resume</span> <i class="las la-briefcase"></i>
          </a>
        </li>
        <li>
          <a class="scroll-to" href="#services">
            <span>Services</span> <i class="las la-stream"></i>
          </a>
        </li>
        <li>
          <a class="scroll-to" href="#skills">
            <span>Skills</span> <i class="las la-shapes"></i>
          </a>
        </li>
        {/* <li>
          <a class="scroll-to" href="#portfolio">
            <span>Portfolios</span> <i class="las la-grip-vertical"></i>
          </a>
        </li> */}

        <li>
          <a class="scroll-to" href="#contact">
            <span>Contact</span> <i class="las la-envelope"></i>
          </a>
        </li>
      </ul>

      <div class="left-sidebar">
        <div class="sidebar-header ">
          {/* <img src="./assets/images/logo.png" alt="Logo" /> */}
          <h1 class="logo">Sreevatsa B R<span className="badge">&#x24B9;</span></h1>
          <h6 class="">Full Stack Devloper</h6>
          {/* <span class="designation">Framer Designer & Developer</span> */}
        </div>
        <img class="me" src="./assets/images/DSC_4237.jpg" style={{ height: "30vh" }} alt="Me" />
        <h2 class="email">sreevatsabr@outlook.com</h2>
        <h2 class="address">Bengaluru, Karnataka, India</h2>
        <p class="copyright">&copy; 2025 Sreevatsa B R. All Rights Reserved</p>
        <ul class="social-profile d-flex align-items-center flex-wrap justify-content-center">
          <li>
            <a href=""><i class="lab la-linkedin"></i></a>
          </li>
          {/* <li>
            <a href=""><i class="lab la-dribbble"></i></a>
          </li>
          <li>
            <a href=""><i class="lab la-instagram"></i></a>
          </li> */}
          <li>
            <a href=""><i class="lab la-github"></i></a>
          </li>
        </ul>
        <a href="mailto:sreevatsabr@outlook.com" class="theme-btn">
          <i class="las la-envelope"></i> Hire Me!
        </a>
      </div>

      <main class="drake-main">
        <div id="smooth-wrapper">
          <div id="smooth-content">

            <div class="left-sidebar">
              <div class="sidebar-header ">
                {/* <img src="./assets/images/logo.png" alt="Logo" /> */}
                <h1 class="logo">Sreevatsa B R<span className="badge">&#x24B9;</span></h1>
                <h6 class="">Full Stack Devloper</h6>
                {/* <span class="designation">Framer Designer & Developer</span> */}
              </div>
              <img class="me" src="./assets/images/DSC_4237.jpg" style={{ height: "30vh" }} alt="Me" />
              <h2 class="email">sreevatsabr@outlook.com</h2>
              <h2 class="address">Bengaluru, Karnataka, India</h2>
              <p class="copyright">&copy; 2025 Sreevatsa B R. All Rights Reserved</p>
              <ul class="social-profile d-flex align-items-center flex-wrap justify-content-center">
                <li>
                  <a href=""><i class="lab la-linkedin"></i></a>
                </li>
                <li>
                  <a href=""><i class="lab la-github"></i></a>
                </li>
              </ul>
              <a href="mailto:sreevatsabr@outlook.com" class="theme-btn">
                <i class="las la-envelope"></i> Hire Me!
              </a>
            </div>

            <section class="hero-section page-section scroll-to-page" id="home">

              <div class="custom-container">
                <div class="hero-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-home"></i> Introduce
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">Hi, I'm <span>Sreevatsa B R</span> </h1>
                  </div>
                  {/* <p >I design and code beautifully simple things and i love what i do. Just simple like that!</p> */}
                  <h5 class="scroll-animation" data-aos="fade_from_bottom"> I bridge the gap between design and development with full-stack solutions that scale.</h5>
                  <br />
                  <br />
                  <a href="#portfolio" class="go-to-project-btn scroll-to scroll-animation" data-aos="rotate_up">
                    <img src="./assets/images/round-text.png" alt="Rounded Text" />
                    <i class="las la-arrow-down"></i>
                  </a>

                  <div class="facts d-flex">
                    <div class="left scroll-animation" data-aos="fade_from_left">
                      <h1>10+</h1>
                      <p>projects completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="about-area page-section scroll-to-page" id="about">
              <div class="custom-container">
                <div class="about-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="lar la-user"></i> About
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">Every great design begin with<br /> an even <span>better story</span></h1>
                  </div>
                  <p class="scroll-animation" data-aos="fade_from_bottom">Since beginning my journey as a freelance designer nearly a years ago, and collaborated with talented people to create digital products for both business and consumer
                    use. I'm quietly confident, naturally curious, and perpetually working on improving my chopsone design problem at a time.</p>
                </div>
              </div>
            </section>


            <section class="resume-area page-section scroll-to-page" id="resume">
              <div class="custom-container">
                <div class="resume-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-briefcase"></i> Resume
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">Education & <span>Experience</span></h1>
                  </div>

                  <div class="resume-timeline">
                    <div class="item scroll-animation" data-aos="fade_from_right">
                      <span class="date">2024 - Present</span>
                      <h2>Full Stack Developer</h2>
                      <p>Excerpt Technologies Pvt Ltd</p>
                    </div>

                  </div>

                </div>
              </div>
            </section>


            <section class="services-area page-section scroll-to-page" id="services">
              <div class="custom-container">
                <div class="services-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-stream"></i> Services
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">My <span>Specializations</span></h1>
                  </div>

                  <div class="services-items">
                    <div class="service-item scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-bezier-curve"></i>
                      <h2>Website Design</h2>
                      <p>Modern, responsive, and user-centric website designs using Figma & Framer.</p>
                      <span class="projects">4+ Projects</span>
                    </div>
                    <div class="service-item scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-code"></i>
                      <h2>Development</h2>
                      <p>Full stack web development with React, Node.js, and scalable backend solutions.</p>
                      <span class="projects">5+ Projects</span>
                    </div>
                    <div class="service-item scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-mobile-alt"></i>
                      <h2>Mobile Application</h2>
                      <p>Cross-platform mobile app development for Android & iOS using modern frameworks.</p>
                      <span class="projects">2+ Projects</span>
                    </div>
                    <div class="service-item scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-chart-line"></i>
                      <h2>SEO/Marketing</h2>
                      <p>Boost your online presence with SEO optimization and digital marketing strategies.</p>
                      <span class="projects">2+ Projects</span>
                    </div>
                    <div class="service-item scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-network-wired"></i>
                      <h2>Microservices</h2>
                      <p>Design and implement scalable microservices architectures for robust applications.</p>
                      <span class="projects">1+ Projects</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>


            <section class="skills-area page-section scroll-to-page" id="skills">
              <div class="custom-container">
                <div class="skills-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-shapes"></i> my skills
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">My <span>Advantages</span></h1>
                  </div>

                  <div class="row skills text-center">
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_right">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                          {/* <h1 class="percent">90%</h1> */}
                        </div>
                        <p class="name">React</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_left">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style={{ height: "67px" }} alt="Python" />
                          {/* <h1 class="percent">92%</h1> */}

                        </div>
                        <p class="name">Python</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_bottom">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" style={{ height: "67px" }} alt="Linux" />
                          {/* <h1 class="percent">85%</h1> */}
                        </div>
                        <p class="name">Linux</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_top">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" style={{ height: "67px" }} alt="AWS" />
                          {/* <h1 class="percent">80%</h1> */}
                        </div>
                        <p class="name">AWS</p>
                      </div>
                    </div>

                    <div class="col-md-3 scroll-animation" data-aos="fade_from_left">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" style={{ height: "67px" }} alt="Azure" />
                          {/* <h1 class="percent">86%</h1> */}
                        </div>
                        <p class="name">Azure</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_bottom">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kivy/kivy-original.svg" style={{ height: "67px" }} alt="Kivy" />
                          {/* <h1 class="percent">70%</h1> */}
                        </div>
                        <p class="name">KIVY</p>
                      </div>
                    </div>
                    {/* Added skills based on services */}
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_right">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style={{ height: "67px" }} alt="Node.js" />
                        </div>
                        <p class="name">Node.js</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_left">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" style={{ height: "67px", background: '#fff', borderRadius: '8px' }} alt="Express.js" />
                        </div>
                        <p class="name">Express.js</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_bottom">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" style={{ height: "67px" }} alt="Mobile App" />
                        </div>
                        <p class="name">Mobile App Dev</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_top">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" style={{ height: "67px" }} alt="Microservices" />
                        </div>
                        <p class="name">Microservices</p>
                      </div>
                    </div>
                    <div class="col-md-3 scroll-animation" data-aos="fade_from_left">
                      <div class="skill">
                        <div class="skill-inner">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" style={{ height: "67px" }} alt="SEO/Marketing" />
                        </div>
                        <p class="name">SEO/Marketing</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>


            {/* <section class="portfolio-area page-section scroll-to-page" id="portfolio">
              <div class="custom-container">
                <div class="portfolio-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-grip-vertical"></i> portfolio
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">Featured <span>Projects</span></h1>
                  </div>

                  <div class="row portfolio-items">
                    <div class="col-md-12 scroll-animation" data-aos="fade_from_bottom">
                      <div class="portfolio-item portfolio-full">
                        <div class="portfolio-item-inner">
                          <a href="./assets/images/portfolio1.jpg" data-lightbox="example-1">
                            <img src="./assets/images/portfolio1.jpg" alt="Portfolio" />
                          </a>

                          <ul class="portfolio-categories">
                            <li>
                              <a href="">Figma</a>
                            </li>
                            <li>
                              <a href="">Framer</a>
                            </li>
                            <li>
                              <a href="">WordPress</a>
                            </li>
                          </ul>
                        </div>
                        <h2><a href="">Bureau - Architecture Studio Website</a></h2>
                      </div>
                    </div>

                    <div class="col-md-6 scroll-animation" data-aos="fade_from_left">
                      <div class="portfolio-item portfolio-half">
                        <div class="portfolio-item-inner">
                          <a href="./assets/images/portfolio2.jpg" data-lightbox="example-1">
                            <img src="./assets/images/portfolio2.jpg" alt="Portfolio" />
                          </a>

                          <img src="./assets/images/portfolio2.jpg" alt="Portfolio" />

                          <ul class="portfolio-categories">
                            <li>
                              <a href="">WordPress</a>
                            </li>
                            <li>
                              <a href="">Larevel/PHP</a>
                            </li>
                          </ul>
                        </div>
                        <h2><a href="">Moonex WordPress Theme</a></h2>
                      </div>
                    </div>

                    <div class="col-md-6 scroll-animation" data-aos="fade_from_right">
                      <div class="portfolio-item portfolio-half">
                        <div class="portfolio-item-inner">
                          <a href="./assets/images/portfolio3.jpg" data-lightbox="example-1">
                            <img src="./assets/images/portfolio3.jpg" alt="Portfolio" />
                          </a>

                          <ul class="portfolio-categories">
                            <li>
                              <a href="">Figma</a>
                            </li>
                            <li>
                              <a href="">Webflow</a>
                            </li>
                          </ul>
                        </div>
                        <h2><a href="">Taskly Dashboard</a></h2>
                      </div>
                    </div>

                    <div class="col-md-12 scroll-animation" data-aos="fade_from_bottom">
                      <div class="portfolio-item portfolio-half">
                        <div class="portfolio-item-inner">
                          <a href="./assets/images/portfolio4.jpg" data-lightbox="example-1">
                            <img src="./assets/images/portfolio4.jpg" alt="portfolio" />
                          </a>

                          <ul class="portfolio-categories">
                            <li>
                              <a href="">Figma</a>
                            </li>
                            <li>
                              <a href="">React</a>
                            </li>
                          </ul>
                        </div>
                        <h2><a href="">Hinterland - Real Estate Site Redesign</a></h2>
                      </div>
                    </div>

                    <div class="col-md-12 scroll-animation" data-aos="fade_from_bottom">
                      <div class="portfolio-item portfolio-half">
                        <div class="portfolio-item-inner">
                          <a href="./assets/images/portfolio5.jpg" data-lightbox="example-1">
                            <img src="./assets/images/portfolio5.jpg" alt="portfolio" />
                          </a>

                          <ul class="portfolio-categories">
                            <li>
                              <a href="">Framer</a>
                            </li>
                          </ul>
                        </div>
                        <h2><a href="">Lewis Portfolio Framer Template</a></h2>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section> */}
            <section class="contact-area page-section scroll-content" id="contact">
              <div class="custom-container">
                <div class="contact-content content-width">
                  <div class="section-header">
                    <h4 class="subtitle scroll-animation" data-aos="fade_from_bottom">
                      <i class="las la-dollar-sign"></i> contact
                    </h4>
                    <h1 class="scroll-animation" data-aos="fade_from_bottom">Let's Work <span>Together!</span></h1>
                  </div>
                  <h3 class="scroll-animation" data-aos="fade_from_bottom">sreevatsabr@outlook.com</h3>
                  <p id="required-msg">* Marked fields are required to fill.</p>

                  <form class="contact-form scroll-animation" data-aos="fade_from_bottom" method="POST" onSubmit={handleSubmit}>
                    <div class="alert alert-success messenger-box-contact__msg" style={{ display: "none" }} role="alert">
                      Your message was sent successfully.
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="input-group">
                          <label for="full-name">full Name <sup>*</sup></label>
                          <input type="text" name="full-name" id="full-name" placeholder="Your Full Name" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="input-group">
                          <label for="email">Email <sup>*</sup></label>
                          <input type="email" name="email" id="email" placeholder="Your email adress" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="input-group">
                          <label for="phone-number">phone <span>(optional)</span></label>
                          <input type="text" name="phone-number" id="phone-number" placeholder="Your number phone" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="input-group">
                          <label for="subject">subject <sup>*</sup></label>
                          <select name="subject" id="subject">
                            <option value="">Select a subject</option>
                            <option value="website-design">Website Design</option>
                            <option value="development">Development</option>
                            <option value="mobile-application">Mobile Application</option>
                            <option value="seo-marketing">SEO/Marketing</option>
                            <option value="microservices">Microservices</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group">
                          <label for="budget">your budget <span>(optional)</span></label>
                          <input type="text" name="budget" id="budget" placeholder="A range budget for your project" pattern="\d*" inputmode="numeric" />

                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group">
                          <label for="message">message</label>
                          <textarea name="message" id="message" placeholder="Wrire your message here ..."></textarea>
                        </div>
                      </div>
                      {/* <div class="col-md-12">
                        <div class="input-group upload-attachment">
                          <div>
                            <label for="upload-attachment">
                              <i class="las la-cloud-upload-alt"></i> add an attachment
                              <input type="file" name="file" id="upload-attachment" />
                            </label>

                          </div>

                        </div>
                      </div> */}
                      <div class="col-md-12">
                        <div class="input-group submit-btn-wrap">
                          <button class="theme-btn" name="submit" type="submit" id="submit-form">send message</button>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

    </>
  )
}

export default App
