# API Contracts - Morello Srl Website

## Backend Implementation Plan

### Current Mock Data (to be replaced)
- **Location**: `/app/frontend/src/mock.js`
- **Mock Functions**: 
  - `submitContactForm(formData)` - Currently stores form data in local array
  - `mockContactSubmissions` - In-memory storage

### API Endpoints to Implement

#### 1. Contact Form Submission
- **Endpoint**: `POST /api/contact`
- **Purpose**: Handle contact form submissions from website
- **Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)", 
  "message": "string (required)"
}
```
- **Response**: 
```json
{
  "success": true,
  "message": "Grazie per il tuo messaggio! Ti contatteremo presto.",
  "submissionId": "string"
}
```

#### 2. Get Contact Submissions (Admin)
- **Endpoint**: `GET /api/contact`
- **Purpose**: Retrieve all contact form submissions
- **Response**:
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string", 
    "phone": "string",
    "message": "string",
    "timestamp": "ISO date string",
    "status": "pending|contacted|resolved"
  }
]
```

### MongoDB Models

#### ContactSubmission Model
```python
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")  # pending, contacted, resolved
```

### Frontend Integration Changes

#### Files to Update:
1. **`/app/frontend/src/components/Contact.jsx`**
   - Remove import of mock functions
   - Update `handleSubmit` to call real API endpoint
   - Add proper error handling and loading states
   - Use `REACT_APP_BACKEND_URL` environment variable

#### Integration Steps:
1. Replace mock `submitContactForm` with actual API call using axios
2. Update form submission handler to use `/api/contact` endpoint
3. Add loading spinner during form submission
4. Show success/error messages based on API response
5. Clear form after successful submission

### Error Handling
- **Validation Errors**: Return 400 with specific field errors
- **Server Errors**: Return 500 with generic error message
- **Network Errors**: Handle on frontend with user-friendly messages

### Database Collection
- **Collection Name**: `contact_submissions`
- **Indexes**: 
  - `timestamp` (for sorting by date)
  - `status` (for filtering by status)

### Implementation Order
1. Create MongoDB model and API endpoints in backend
2. Test backend endpoints with curl/Postman
3. Update frontend Contact component to use real API
4. Remove mock.js dependency
5. Test full integration flow