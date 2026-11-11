"""Focused contracts for sponsor proof, missing fields, and goal mappings."""
import unittest
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[1]


class ProofContractTests(unittest.TestCase):
    def setUp(self):
        self.data = yaml.safe_load((ROOT / '_data/case_study.yml').read_text())
        self.tiles = {x['label']: x for k in ('funnel', 'profile') for x in self.data[k]}

    def test_unverified_outcomes_stay_named_placeholders(self):
        for label in ('Enrollments', 'Module completions', 'Students employed next year'):
            with self.subTest(label=label):
                self.assertIsNone(self.tiles[label]['value'])
                self.assertIn('Pending:', self.tiles[label]['detail'])

    def test_coverage_and_denominators_are_visible(self):
        self.assertIn('973', self.data['method'])
        self.assertIn('631', self.data['method'])
        self.assertIn('592', self.tiles['Mid-level and above']['detail'])
        self.assertIn('565', self.tiles['Roles']['detail'])
        self.assertIn('395', self.tiles['Companies represented']['detail'])
        self.assertIn('631', self.tiles['Freelancers and contractors']['detail'])
        self.assertIn('592', self.tiles['Students and job seekers today']['detail'])

    def test_submissions_are_not_claimed_as_passed_or_completed(self):
        for label in ('Module 3 homework submitters', 'Final-project submitters', 'Submitted project repositories'):
            with self.subTest(label=label):
                self.assertTrue(self.tiles[label]['value'])
                self.assertIn('2025:', self.tiles[label]['detail'])
                self.assertIn('2026:', self.tiles[label]['detail'])
        self.assertIn('not completion or pass', self.data['status'])
        self.assertIn('not all enrolled', self.data['method'])

    def test_no_personal_identifiers_or_sensitive_tool_usage_in_proof(self):
        text = yaml.safe_dump(self.data)
        self.assertNotIn('@', text)
        self.assertNotIn('github.com/', text)
        self.assertNotIn('airflow', text.lower())

    def test_each_goal_maps_to_existing_formats(self):
        goals = yaml.safe_load((ROOT / '_data/goals.yml').read_text())
        options = yaml.safe_load((ROOT / '_data/options.yml').read_text())
        keys = {x['key'] for x in options}
        self.assertEqual({g['key'] for g in goals}, {'awareness', 'trial', 'demo', 'long', 'promote'})
        for goal in goals:
            self.assertTrue(goal['options'])
            self.assertTrue(set(goal['options']) <= keys)
        self.assertIn('data-goal-panel="everything"', (ROOT / '_includes/goals.html').read_text())


if __name__ == '__main__':
    unittest.main()
