#!/usr/bin/env python3
"""
Backend API Testing for Morello Srl Contact Form System
Tests the contact form API endpoints for proper functionality
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Get backend URL from frontend env (this is the public endpoint)
BACKEND_URL = "https://d07ab082-e3a8-48bb-86f4-b50fbd3aa0d4.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class ContactFormTester:
    def __init__(self):
        self.test_results = []
        self.submission_ids = []  # Track created submissions for cleanup
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_backend_connectivity(self):
        """Test if backend is accessible"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                self.log_test("Backend Connectivity", True, "Backend is accessible")
                return True
            else:
                self.log_test("Backend Connectivity", False, f"Backend returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Backend Connectivity", False, f"Cannot connect to backend: {str(e)}")
            return False

    def test_valid_contact_submission_full(self):
        """Test valid contact form submission with all fields"""
        test_data = {
            "name": "Marco Rossi",
            "email": "marco.rossi@morello-engineering.it",
            "phone": "+39 011 123 4567",
            "message": "Salve, sono interessato ai vostri servizi di assemblaggio meccanico per l'industria metallurgica. Potreste contattarmi per discutere di un progetto?"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "submissionId" in data:
                    self.submission_ids.append(data["submissionId"])
                    self.log_test("Valid Contact Submission (Full)", True, 
                                "Contact form submitted successfully with all fields",
                                {"response": data, "status_code": response.status_code})
                    return True
                else:
                    self.log_test("Valid Contact Submission (Full)", False,
                                "Response format incorrect or success=False",
                                {"response": data, "status_code": response.status_code})
                    return False
            else:
                self.log_test("Valid Contact Submission (Full)", False,
                            f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Valid Contact Submission (Full)", False, f"Request failed: {str(e)}")
            return False

    def test_valid_contact_submission_minimal(self):
        """Test valid contact form submission with only required fields"""
        test_data = {
            "name": "Giulia Bianchi",
            "email": "giulia.bianchi@industria-chimica.it",
            "message": "Vorrei informazioni sui vostri standard di qualità per l'industria chimica."
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "submissionId" in data:
                    self.submission_ids.append(data["submissionId"])
                    self.log_test("Valid Contact Submission (Minimal)", True,
                                "Contact form submitted successfully with required fields only",
                                {"response": data, "status_code": response.status_code})
                    return True
                else:
                    self.log_test("Valid Contact Submission (Minimal)", False,
                                "Response format incorrect or success=False",
                                {"response": data, "status_code": response.status_code})
                    return False
            else:
                self.log_test("Valid Contact Submission (Minimal)", False,
                            f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Valid Contact Submission (Minimal)", False, f"Request failed: {str(e)}")
            return False

    def test_missing_required_fields(self):
        """Test validation for missing required fields"""
        test_cases = [
            {"email": "test@example.com", "message": "Test message"},  # Missing name
            {"name": "Test User", "message": "Test message"},  # Missing email
            {"name": "Test User", "email": "test@example.com"},  # Missing message
            {}  # Missing all fields
        ]
        
        all_passed = True
        for i, test_data in enumerate(test_cases):
            try:
                response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
                
                # Should return 422 for validation errors or 200 with success=False
                if response.status_code in [422, 400] or (response.status_code == 200 and not response.json().get("success")):
                    self.log_test(f"Missing Required Fields (Case {i+1})", True,
                                f"Properly rejected submission with missing fields",
                                {"test_data": test_data, "status_code": response.status_code})
                else:
                    self.log_test(f"Missing Required Fields (Case {i+1})", False,
                                f"Should have rejected submission but got {response.status_code}",
                                {"test_data": test_data, "response": response.text})
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Missing Required Fields (Case {i+1})", False, f"Request failed: {str(e)}")
                all_passed = False
        
        return all_passed

    def test_invalid_email_formats(self):
        """Test validation for invalid email formats"""
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "test@",
            "test.example.com",
            "test@.com",
            ""
        ]
        
        all_passed = True
        for email in invalid_emails:
            test_data = {
                "name": "Test User",
                "email": email,
                "message": "Test message"
            }
            
            try:
                response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
                
                # Should return 422 for validation errors or 200 with success=False
                if response.status_code in [422, 400] or (response.status_code == 200 and not response.json().get("success")):
                    self.log_test(f"Invalid Email Format ({email})", True,
                                "Properly rejected invalid email format",
                                {"email": email, "status_code": response.status_code})
                else:
                    self.log_test(f"Invalid Email Format ({email})", False,
                                f"Should have rejected invalid email but got {response.status_code}",
                                {"email": email, "response": response.text})
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Invalid Email Format ({email})", False, f"Request failed: {str(e)}")
                all_passed = False
        
        return all_passed

    def test_empty_whitespace_fields(self):
        """Test handling of empty and whitespace-only fields"""
        test_cases = [
            {"name": "   ", "email": "test@example.com", "message": "Test"},  # Whitespace name
            {"name": "Test", "email": "   ", "message": "Test"},  # Whitespace email
            {"name": "Test", "email": "test@example.com", "message": "   "},  # Whitespace message
            {"name": "", "email": "test@example.com", "message": "Test"},  # Empty name
        ]
        
        all_passed = True
        for i, test_data in enumerate(test_cases):
            try:
                response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
                
                # Should reject empty/whitespace fields
                if response.status_code in [422, 400] or (response.status_code == 200 and not response.json().get("success")):
                    self.log_test(f"Empty/Whitespace Fields (Case {i+1})", True,
                                "Properly rejected empty/whitespace fields",
                                {"test_data": test_data, "status_code": response.status_code})
                else:
                    self.log_test(f"Empty/Whitespace Fields (Case {i+1})", False,
                                f"Should have rejected empty/whitespace fields but got {response.status_code}",
                                {"test_data": test_data, "response": response.text})
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Empty/Whitespace Fields (Case {i+1})", False, f"Request failed: {str(e)}")
                all_passed = False
        
        return all_passed

    def test_long_message_content(self):
        """Test handling of very long message content"""
        long_message = "A" * 5000  # 5000 character message
        
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": long_message
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Long Message Content", True,
                                "Successfully handled very long message",
                                {"message_length": len(long_message), "status_code": response.status_code})
                    if "submissionId" in data:
                        self.submission_ids.append(data["submissionId"])
                    return True
                else:
                    self.log_test("Long Message Content", False,
                                "Server rejected long message",
                                {"message_length": len(long_message), "response": data})
                    return False
            else:
                self.log_test("Long Message Content", False,
                            f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Long Message Content", False, f"Request failed: {str(e)}")
            return False

    def test_special_characters(self):
        """Test handling of special characters in form fields"""
        test_data = {
            "name": "José María Ñoño-Pérez",
            "email": "josé.maría@piping-systems.it",
            "phone": "+39 (011) 123-4567 ext. 890",
            "message": "Ciao! Siamo interessati ai vostri servizi per l'industria oil&gas. Abbiamo bisogno di assemblaggio per tubazioni ad alta pressione (>100 bar). Potete fornire certificazioni ISO 9001 & ASME? Grazie mille! 🏭⚙️"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Special Characters", True,
                                "Successfully handled special characters",
                                {"status_code": response.status_code})
                    if "submissionId" in data:
                        self.submission_ids.append(data["submissionId"])
                    return True
                else:
                    self.log_test("Special Characters", False,
                                "Server rejected special characters",
                                {"response": data})
                    return False
            else:
                self.log_test("Special Characters", False,
                            f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Special Characters", False, f"Request failed: {str(e)}")
            return False

    def test_get_contact_submissions(self):
        """Test GET endpoint for retrieving contact submissions"""
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our test submissions are in the results
                    found_submissions = 0
                    for submission in data:
                        if submission.get("id") in self.submission_ids:
                            found_submissions += 1
                    
                    self.log_test("GET Contact Submissions", True,
                                f"Successfully retrieved {len(data)} submissions, found {found_submissions} test submissions",
                                {"total_submissions": len(data), "found_test_submissions": found_submissions})
                    
                    # Verify structure of first submission if any exist
                    if data:
                        first_submission = data[0]
                        required_fields = ["id", "name", "email", "message", "timestamp", "status"]
                        missing_fields = [field for field in required_fields if field not in first_submission]
                        
                        if not missing_fields:
                            self.log_test("Submission Structure Validation", True,
                                        "Contact submission structure is correct",
                                        {"sample_submission": first_submission})
                        else:
                            self.log_test("Submission Structure Validation", False,
                                        f"Missing required fields: {missing_fields}",
                                        {"sample_submission": first_submission})
                    
                    return True
                else:
                    self.log_test("GET Contact Submissions", False,
                                "Response is not a list",
                                {"response_type": type(data), "response": data})
                    return False
            else:
                self.log_test("GET Contact Submissions", False,
                            f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("GET Contact Submissions", False, f"Request failed: {str(e)}")
            return False

    def test_response_format_italian(self):
        """Test that success messages are in Italian"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                message = data.get("message", "")
                
                # Check for Italian keywords in success message
                italian_keywords = ["grazie", "messaggio", "contatteremo", "presto"]
                has_italian = any(keyword.lower() in message.lower() for keyword in italian_keywords)
                
                if has_italian:
                    self.log_test("Italian Response Messages", True,
                                "Response message is in Italian",
                                {"message": message})
                    if "submissionId" in data:
                        self.submission_ids.append(data["submissionId"])
                    return True
                else:
                    self.log_test("Italian Response Messages", False,
                                "Response message is not in Italian",
                                {"message": message})
                    return False
            else:
                self.log_test("Italian Response Messages", False,
                            f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Italian Response Messages", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("BACKEND API TESTING - MORELLO SRL CONTACT FORM SYSTEM")
        print("=" * 80)
        print()
        
        # Test backend connectivity first
        if not self.test_backend_connectivity():
            print("❌ Backend is not accessible. Stopping tests.")
            return False
        
        print("Running comprehensive backend API tests...")
        print()
        
        # Run all tests
        tests = [
            self.test_valid_contact_submission_full,
            self.test_valid_contact_submission_minimal,
            self.test_missing_required_fields,
            self.test_invalid_email_formats,
            self.test_empty_whitespace_fields,
            self.test_long_message_content,
            self.test_special_characters,
            self.test_response_format_italian,
            self.test_get_contact_submissions,
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            try:
                if test():
                    passed += 1
                time.sleep(0.5)  # Small delay between tests
            except Exception as e:
                print(f"❌ Test {test.__name__} crashed: {str(e)}")
        
        print("=" * 80)
        print(f"BACKEND TESTING COMPLETE: {passed}/{total} tests passed")
        print("=" * 80)
        
        # Print summary
        print("\nTEST SUMMARY:")
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = ContactFormTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend tests passed!")
        exit(0)
    else:
        print("\n⚠️  Some backend tests failed. Check the details above.")
        exit(1)