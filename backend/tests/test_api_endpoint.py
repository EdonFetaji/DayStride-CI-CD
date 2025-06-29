from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from datetime import date, timedelta


class APICRUDTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="testuser", password="password123")
        cls.login_url = reverse('token_obtain_pair')
        cls.refresh_url = reverse('token_refresh')

    def setUp(self):
        self.client = APIClient()
        res = self.client.post(self.login_url, {"username": "testuser", "password": "password123"})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.token = res.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    # ===== AUTH TESTS =====
    def test_01_token_refresh(self):
        res = self.client.post(self.login_url, {"username": "testuser", "password": "password123"})
        refresh_token = res.data['refresh']
        res = self.client.post(self.refresh_url, {"refresh": refresh_token})
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    # ===== DASHBOARD TEST =====
    def test_02_dashboard_get(self):
        res = self.client.get('/api/dashboard/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('username', res.data)

    # ===== GOALS CRUD =====
    def test_03_goal_create(self):
        payload = {
            "name": "Test Goal",
            "description": "Goal description",
            "end_date": (date.today() + timedelta(days=5)).isoformat(),
            "location": "Skopje",
            "is_public": True
        }
        res = self.client.post('/api/goals/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_04_goal_retrieve(self):
        goal = self._create_goal()
        res = self.client.get(f'/api/goals/{goal["id"]}/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_05_goal_update(self):
        goal = self._create_goal()
        payload = {
            "name": "Updated Goal",
            "description": "Updated description",
            "end_date": (date.today() + timedelta(days=10)).isoformat(),
            "location": "Tetovo",
            "is_public": False
        }
        res = self.client.put(f'/api/goals/{goal["id"]}/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_06_goal_delete(self):
        goal = self._create_goal()
        res = self.client.delete(f'/api/goals/{goal["id"]}/')
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    # ===== TODOS CRUD =====
    def test_07_todo_create(self):
        payload = {
            "name": "Test Todo",
            "category": "Work",
            "description": "Todo description",
            "deadline": (date.today() + timedelta(days=3)).isoformat(),
            "priority": 2,
            "completed": False
        }
        res = self.client.post('/api/todos/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_08_todo_retrieve(self):
        todo = self._create_todo()
        res = self.client.get(f'/api/todos/{todo["id"]}/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_09_todo_update(self):
        todo = self._create_todo()
        payload = {
            "name": "Updated Todo",
            "category": "Personal",
            "description": "Updated description",
            "deadline": (date.today() + timedelta(days=5)).isoformat(),
            "priority": 1,
            "completed": True
        }
        res = self.client.put(f'/api/todos/{todo["id"]}/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_10_todo_delete(self):
        todo = self._create_todo()
        res = self.client.delete(f'/api/todos/{todo["id"]}/')
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    # ===== HABITS CRUD =====
    def test_11_habit_create(self):
        payload = {
            "name": "Morning Run",
            "description": "Run 3km every morning"
        }
        res = self.client.post('/api/habits/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_12_habit_retrieve(self):
        habit = self._create_habit()
        res = self.client.get(f'/api/habits/{habit["id"]}/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_13_habit_update(self):
        habit = self._create_habit()
        payload = {
            "name": "Evening Run",
            "description": "Run 5km every evening"
        }
        res = self.client.put(f'/api/habits/{habit["id"]}/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_14_habit_delete(self):
        habit = self._create_habit()
        res = self.client.delete(f'/api/habits/{habit["id"]}/')
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    # ===== Helper Methods =====
    def _create_goal(self):
        payload = {
            "name": "Test Goal",
            "description": "Goal description",
            "end_date": (date.today() + timedelta(days=5)).isoformat(),
            "location": "Skopje",
            "is_public": True
        }
        res = self.client.post('/api/goals/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        return res.data

    def _create_todo(self):
        payload = {
            "name": "Test Todo",
            "category": "Work",
            "description": "Todo description",
            "deadline": (date.today() + timedelta(days=3)).isoformat(),
            "priority": 2,
            "completed": False
        }
        res = self.client.post('/api/todos/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        return res.data

    def _create_habit(self):
        payload = {
            "name": "Morning Run",
            "description": "Run 3km every morning"
        }
        res = self.client.post('/api/habits/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        return res.data

    # ===== GOALS JOIN TEST =====
    def test_15_goal_join(self):
        # Create a goal to join
        goal = self._create_goal()

        payload = {
            "goal": goal["id"]
        }

        res = self.client.post('/api/goals/join/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn("detail", res.data)
        self.assertEqual(res.data["detail"], "Goal successfully added to user.")

    # ===== GOALS REMOVE TEST =====
    def test_16_goal_remove(self):
        # Create a goal and join it first
        goal = self._create_goal()

        # Join the goal
        join_payload = {"goal": goal["id"]}
        res = self.client.post('/api/goals/join/', join_payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        # Now remove the goal
        remove_payload = {"goal": goal["id"]}
        res = self.client.post('/api/goals/remove/', remove_payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
