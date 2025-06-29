// This is a mock service that simulates API calls to a backend server
// In a real application, you would replace these with actual API calls using axios or fetch

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing.\n\nOne of the key features of React is its component-based architecture. Components are reusable pieces of code that return React elements describing what should appear on the screen. They can be composed together to build complex UIs from simple building blocks.\n\nReact also introduces a virtual DOM, which is a lightweight representation of the real DOM. When the state of a component changes, React updates the virtual DOM first, then compares it with the previous version to determine the most efficient way to update the real DOM.',
    author: 'John Doe',
    createdAt: '2025-05-15T10:30:00Z',
    image: '/images/react.jpg',
    views: 1250,
    likes: 85
  },
  {
    id: 2,
    title: 'Advanced CSS Techniques',
    content: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts. This separation can improve content accessibility, provide more flexibility and control in the specification of presentation characteristics, enable multiple web pages to share formatting, and reduce complexity and repetition in the structural content.\n\nModern CSS has evolved significantly with features like Flexbox and Grid layouts, which provide powerful tools for creating complex layouts with clean, readable code. CSS variables (custom properties) allow for more maintainable stylesheets by defining reusable values that can be changed in one place.\n\nCSS animations and transitions enable smooth, performant animations without JavaScript. With media queries, you can create responsive designs that adapt to different screen sizes and devices.',
    author: 'Jane Smith',
    createdAt: '2025-05-20T14:45:00Z',
    image: '/images/css.jpg',
    views: 980,
    likes: 62
  },
  {
    id: 3,
    title: 'JavaScript ES6 Features',
    content: 'ECMAScript 2015, also known as ES6, introduced many changes to JavaScript. With the release of ES6, JavaScript got a lot of new features including arrow functions, classes, template literals, let and const keywords, destructuring assignment, spread operator, rest parameters, default parameters, and many more features.\n\nArrow functions provide a concise syntax for writing function expressions and lexically bind the this value, making them particularly useful for callbacks. Classes offer a cleaner, more familiar syntax for creating objects and dealing with inheritance, although they are primarily syntactical sugar over JavaScript\'s existing prototype-based inheritance.\n\nDestructuring assignment allows you to extract data from arrays or objects into distinct variables, making it easier to work with complex data structures. The spread operator allows an iterable to be expanded in places where zero or more arguments or elements are expected.',
    author: 'Mike Johnson',
    createdAt: '2025-05-25T09:15:00Z',
    image: '/images/javascript.jpg',
    views: 1500,
    likes: 120
  },
  {
    id: 4,
    title: 'Introduction to Node.js',
    content: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user\'s web browser.\n\nOne of the key features of Node.js is its event-driven, non-blocking I/O model, which makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js has a rich ecosystem of packages available through npm (Node Package Manager), which is one of the largest software registries in the world.\n\nNode.js is commonly used for building web servers, real-time applications, command-line tools, and microservices. Its ability to use JavaScript on both the front-end and back-end allows for full-stack JavaScript development.',
    author: 'Sarah Williams',
    createdAt: '2025-06-01T11:20:00Z',
    image: '/images/nodejs.jpg',
    views: 850,
    likes: 45
  },
  {
    id: 5,
    title: 'Responsive Web Design Principles',
    content: 'Responsive web design (RWD) is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. Recent work also considers the viewer proximity as part of the viewing context as an extension for RWD. Content, design and performance are necessary across all devices to ensure usability and satisfaction.\n\nThe core principles of responsive design include fluid grids, flexible images, and media queries. Fluid grids use relative units like percentages instead of fixed units like pixels, allowing layout elements to resize proportionally to the screen size. Flexible images adjust their size based on the viewport, preventing them from overflowing their containers.\n\nMedia queries allow you to apply different CSS styles based on characteristics of the device, such as its width, height, orientation, or resolution. This enables you to create tailored experiences for different devices while maintaining a single codebase.',
    author: 'David Brown',
    createdAt: '2025-06-05T16:30:00Z',
    image: '/images/responsive.jpg',
    views: 1100,
    likes: 75
  },
  {
    id: 6,
    title: 'Introduction to GraphQL',
    content: 'GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015. It provides an efficient, powerful and flexible approach to developing web APIs, and has been compared and contrasted with REST and other web service architectures.\n\nUnlike REST, which exposes a fixed set of endpoints, each returning fixed data structures, GraphQL exposes a single endpoint that responds to queries. Clients can specify exactly what data they need, and the server returns only that data. This helps prevent over-fetching or under-fetching of data, which are common problems with REST APIs.\n\nGraphQL also allows for powerful queries that can retrieve multiple resources in a single request, reducing the number of network requests needed. It provides a strong type system that defines the capabilities of the API and ensures that clients can request only what\'s possible to return.',
    author: 'Emily Davis',
    createdAt: '2025-06-10T13:45:00Z',
    image: '/images/graphql.jpg',
    views: 750,
    likes: 40
  },
  {
    id: 7,
    title: 'Web Security Best Practices',
    content: 'Web security is the practice of protecting websites and online services against different security threats that exploit vulnerabilities in web applications. Common threats include cross-site scripting (XSS), SQL injection, cross-site request forgery (CSRF), and distributed denial-of-service (DDoS) attacks. Implementing proper security measures is essential for protecting user data and maintaining trust.\n\nSome key security practices include input validation and sanitization to prevent injection attacks, using HTTPS to encrypt data in transit, implementing proper authentication and authorization mechanisms, keeping software and dependencies updated, and following the principle of least privilege.\n\nContent Security Policy (CSP) is a security standard that helps prevent XSS attacks by specifying which dynamic resources are allowed to load. CORS (Cross-Origin Resource Sharing) controls how web pages in one domain can request resources from another domain, helping to prevent unauthorized access to sensitive data.',
    author: 'Alex Turner',
    createdAt: '2025-06-15T10:00:00Z',
    image: '/images/security.jpg',
    views: 1300,
    likes: 95
  },
  {
    id: 8,
    title: 'Docker for Web Developers',
    content: 'Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. Docker makes it easier to create, deploy, and run applications by using containers.\n\nFor web developers, Docker provides a consistent development environment across different machines, eliminating the "it works on my machine" problem. It allows you to package your application with all its dependencies into a standardized unit that can run consistently on any platform that supports Docker.\n\nDocker Compose is a tool for defining and running multi-container Docker applications, making it easy to manage complex applications with multiple services. Docker Hub provides a repository of pre-built container images that you can use as a starting point for your own containers.',
    author: 'Chris Wilson',
    createdAt: '2025-06-20T14:15:00Z',
    image: '/images/docker.jpg',
    views: 900,
    likes: 55
  }
];

// Get all blogs with pagination
export const getBlogs = async (page = 1, limit = 6, filter = 'latest') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Clone the array to avoid modifying the original
  let filteredBlogs = [...sampleBlogs];
  
  // Apply filter
  if (filter === 'latest') {
    filteredBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (filter === 'trending') {
    filteredBlogs.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
  
  return {
    blogs: paginatedBlogs,
    totalPages: Math.ceil(filteredBlogs.length / limit),
    currentPage: page,
    totalBlogs: filteredBlogs.length
  };
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const blog = sampleBlogs.find(blog => blog.id === parseInt(id));
  
  if (!blog) {
    throw new Error('Blog not found');
  }
  
  // Simulate incrementing view count
  blog.views += 1;
  
  return blog;
};

// Create a new blog
export const createBlog = async (blogData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create a new blog with an ID and other default values
  const newBlog = {
    id: sampleBlogs.length + 1,
    ...blogData,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0
  };
  
  // Add to the sample blogs array
  sampleBlogs.unshift(newBlog);
  
  return newBlog;
};

// Like a blog
export const likeBlog = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const blog = sampleBlogs.find(blog => blog.id === parseInt(id));
  
  if (!blog) {
    throw new Error('Blog not found');
  }
  
  // Increment like count
  blog.likes += 1;
  
  return blog;
};

// Mock user authentication
export const loginUser = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock users
  const users = [
    { id: 1, username: 'creator', password: 'password', role: 'content-creator', name: 'Content Creator' },
    { id: 2, username: 'user', password: 'password', role: 'user', name: 'Regular User' }
  ];
  
  const user = users.find(
    user => user.username === credentials.username && user.password === credentials.password
  );
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Don't return the password
  const { password, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
};