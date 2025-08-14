# Medical Blog Management System

This system allows you to manage medical blog content directly from the Dashboard, with full CRUD operations and real-time updates.

## Features

- **Create New Blogs**: Add new medical blog posts with title, change title, content, and image
- **Edit Existing Blogs**: Modify any blog post by clicking the edit button
- **Delete Blogs**: Remove blog posts with confirmation
- **Real-time Updates**: Changes are immediately reflected on the medical blogs page
- **Backend Integration**: All data is stored in MongoDB and served via REST API

## How to Use

### 1. Access the Dashboard
- Navigate to the Dashboard component
- Click on "Project" in the sidebar to access the blog management section

### 2. Create a New Blog
- Click the "New Blog" button
- Fill in the form fields:
  - **Blog Title**: Main heading of the blog post
  - **Blog Change Title**: Subtitle or secondary heading
  - **Blog Content**: Main body text of the blog post
  - **Blog Image URL**: URL to the blog's featured image
- Click "Create Blog" to save

### 3. Edit an Existing Blog
- In the "Existing Blogs" section, click the edit (pencil) icon
- Modify the fields as needed
- Click "Save Changes" to update
- Click "Cancel" to discard changes

### 4. Delete a Blog
- In the "Existing Blogs" section, click the delete (trash) icon
- Confirm the deletion in the popup dialog

## Backend API Endpoints

- `GET /api/blog` - Fetch all blogs
- `GET /api/blog/:id` - Fetch blog by ID
- `POST /api/blog` - Create new blog
- `PUT /api/blog/:id` - Update blog by ID
- `DELETE /api/blog/:id` - Delete blog by ID

## Database Schema

```javascript
{
  _id: ObjectId,
  title: String,       
  changeTitle: String,  
  content: String,     
  image: String,       
  createdAt: Date,     
  updatedAt: Date      
}
```

## Seeding the Database

To populate the database with sample data:

1. Ensure your MongoDB connection is configured
2. Run the seed script:
   ```bash
   cd Backend
   node seedBlogs.js
   ```

This will create 3 sample medical blogs to get you started.

## Frontend Integration

The medical blogs page (`medicalBlogs.tsx`) automatically fetches and displays the latest blog content from the backend. No manual updates are needed - changes made in the Dashboard are immediately visible to users.

## Security Notes

- Ensure proper authentication for Dashboard access
- Validate input data on both frontend and backend
- Implement rate limiting for API endpoints in production
- Use HTTPS for all API communications

## Troubleshooting

- **Blogs not loading**: Check MongoDB connection and API endpoints
- **Images not displaying**: Verify image URLs are accessible
- **Edit not working**: Ensure blog ID is valid and API is responding
- **Create failed**: Check required fields are filled and API is accessible
