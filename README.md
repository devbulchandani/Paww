# 🐾 Paww - Stray Dog Registration & Adoption Platform

Paww is a comprehensive platform that connects stray dogs with loving homes through both web and WhatsApp interfaces. The platform enables quick registration of stray dogs and facilitates direct connections between adopters and registrants.

## 🌟 Features

### Core MVP Features
- **🔍 Dog Search & Browse** - Advanced search with location, age, gender, and vaccination filters
- **📝 Dog Registration** - Easy registration via web form with photo upload
- **📱 WhatsApp Bot Integration** - Register and search dogs via WhatsApp (Coming Soon)
- **🤝 Direct Adoption Connection** - Connect adopters directly with registrants
- **🏥 Vaccination Partner Support** - Optional NGO/vet referrals post-adoption
- **📍 Location-based Search** - Find dogs near your location

### Technical Features
- **🔐 User Authentication** - Secure login/registration system
- **☁️ Cloud Image Storage** - Cloudinary integration for photo management
- **🗺️ Geographic Search** - PostGIS-powered location queries
- **📱 Responsive Design** - Mobile-friendly interface
- **🔄 Real-time Updates** - Live search and filtering

## 🏗️ Architecture

### Backend (Spring Boot)
- **Java 17** with Spring Boot 3.x
- **PostgreSQL** database with PostGIS extension
- **Spring Security** for authentication
- **Cloudinary** for image management
- **WhatsApp Business API** integration (planned)

### Frontend (React)
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **React Router** for navigation
- **Axios** for API communication

## 🚀 Getting Started

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **PostgreSQL 14+** with PostGIS extension
- **Maven 3.8+**
- **Cloudinary Account** (for image uploads)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paww
   ```

2. **Configure Database**
   ```sql
   CREATE DATABASE paww;
   CREATE EXTENSION postgis;
   ```

3. **Configure Application Properties**
   Copy the template and configure your settings:
   ```bash
   cd paww/src/main/resources/
   cp application.properties.template application.properties
   ```
   
   Then edit `application.properties` with your actual values:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/paww
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   
   # Cloudinary Configuration (Get from https://cloudinary.com)
   cloudinary.cloud-name=your_cloud_name
   cloudinary.api-key=your_api_key
   cloudinary.api-secret=your_api_secret
   ```
   
   ⚠️ **Important**: Never commit `application.properties` to git as it contains sensitive information!

4. **Run the Backend**
   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd paww-client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173` or `http://localhost:5174`

## 📱 Usage

### For Dog Registrants
1. **Sign Up** with your details and select "Register stray dogs" role
2. **Login** to your account
3. **Register a Dog** by filling out the form with:
   - Dog's name, age, gender
   - Description and vaccination status
   - Location (state, city, locality, street)
   - Upload a photo
4. **Receive Adoption Inquiries** via phone/WhatsApp from interested adopters

### For Adopters
1. **Browse Dogs** on the homepage or search page
2. **Use Filters** to find dogs by location, age, gender, vaccination status
3. **View Dog Profiles** with detailed information and photos
4. **Contact for Adoption** - get direct contact information of the registrant
5. **Connect via Phone/WhatsApp** to discuss adoption details

### For Both Roles
- **Dashboard** to manage your activities
- **Profile Management** to update your information
- **Search History** and adoption tracking (coming soon)

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Dog Management
- `POST /dogs` - Register a new dog
- `GET /dogs` - Search dogs with filters
- `GET /dogs/{id}` - Get dog details

### Location Services
- `GET /locations/states` - Get all states
- `GET /locations/cities?state={state}` - Get cities by state
- `GET /locations/localities?state={state}&city={city}` - Get localities
- `GET /locations/streets?state={state}&city={city}&locality={locality}` - Get streets

### Adoption (Coming Soon)
- `POST /adoptions/{dogId}/contact` - Get registrant contact info
- `POST /adoptions/{dogId}/referral` - Send to vaccination partner

## 🗂️ Project Structure

```
paww/
├── paww/                          # Spring Boot Backend
│   ├── src/main/java/com/example/paww/
│   │   ├── controllers/           # REST Controllers
│   │   ├── services/             # Business Logic
│   │   ├── models/               # JPA Entities
│   │   ├── repository/           # Data Access Layer
│   │   ├── dto/                  # Data Transfer Objects
│   │   ├── config/               # Configuration Classes
│   │   └── enums/                # Enumerations
│   └── src/main/resources/       # Configuration Files
├── paww-client/                   # React Frontend
│   ├── src/
│   │   ├── components/           # React Components
│   │   ├── pages/                # Page Components
│   │   ├── services/             # API Services
│   │   ├── context/              # React Context
│   │   ├── types/                # TypeScript Types
│   │   └── data/                 # Static Data
│   └── public/                   # Static Assets
└── .kiro/                        # Kiro IDE Specifications
    └── specs/paww-mvp/           # Project Requirements & Design
```

## 🔒 Security

### Configuration Security
- **Never commit** `application.properties` or any files containing sensitive data
- Use `application.properties.template` as a reference for required configuration
- Store sensitive values in environment variables for production
- Use different configuration files for different environments

### Environment Variables (Recommended for Production)
```bash
export DB_URL=jdbc:postgresql://localhost:5432/paww
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export CLOUDINARY_CLOUD_NAME=your_cloud_name
export CLOUDINARY_API_KEY=your_api_key
export CLOUDINARY_API_SECRET=your_api_secret
```

Then reference them in your application.properties:
```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
cloudinary.cloud-name=${CLOUDINARY_CLOUD_NAME}
cloudinary.api-key=${CLOUDINARY_API_KEY}
cloudinary.api-secret=${CLOUDINARY_API_SECRET}
```

## 🧪 Testing

### Backend Testing
```bash
cd paww
./mvnw test
```

### Frontend Testing
```bash
cd paww-client
npm test
```

## 🚀 Deployment

### Backend Deployment
1. **Build the JAR**
   ```bash
   ./mvnw clean package
   ```

2. **Deploy to your server** with environment variables:
   ```bash
   java -jar target/paww-0.0.1-SNAPSHOT.jar \
     --spring.profiles.active=prod \
     --spring.datasource.url=your_prod_db_url
   ```

### Frontend Deployment
1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### Phase 1 - MVP (Current)
- [x] User authentication system
- [x] Dog registration with image upload
- [x] Advanced search and filtering
- [x] Location-based search
- [x] Direct adoption connections
- [ ] Adoption interest tracking
- [ ] Enhanced geographic search with PostGIS

### Phase 2 - WhatsApp Integration
- [ ] WhatsApp bot for dog registration
- [ ] WhatsApp bot for dog search
- [ ] AI-powered chat assistance
- [ ] Multi-language support

### Phase 3 - Advanced Features
- [ ] Vaccination tracking system
- [ ] NGO/Vet partner integration
- [ ] Municipal dashboard and analytics
- [ ] Volunteer management system
- [ ] Event scheduling and management

### Phase 4 - Scale & Analytics
- [ ] Heatmaps for municipal use
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Multi-city expansion tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot Community** for the excellent framework
- **React Team** for the powerful frontend library
- **Cloudinary** for image management services
- **PostGIS** for geographic capabilities
- **Tailwind CSS** for beautiful styling

## 📞 Support

For support, email support@paww.app or join our community discussions.

---

**Made with ❤️ for stray dogs and their future families**