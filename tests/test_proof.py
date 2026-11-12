"""Focused contracts: the kit stays small, goal-first, and honest about proof."""
import unittest
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return yaml.safe_load((ROOT / "_data" / name).read_text())


class GoalContractTests(unittest.TestCase):
    def setUp(self):
        self.goals = load("goals.yml")
        self.page = (ROOT / "_includes/goals.html").read_text()

    def test_each_goal_leads_to_at_most_three_existing_formats(self):
        keys = {x["key"] for x in load("options.yml")}
        self.assertEqual(
            [g["key"] for g in self.goals],
            ["awareness", "trial", "demo", "long", "promote"],
        )
        for goal in self.goals:
            with self.subTest(goal=goal["key"]):
                self.assertTrue(1 <= len(goal["options"]) <= 3)
                self.assertTrue(set(goal["options"]) <= keys)

    def test_show_everything_is_the_sixth_choice(self):
        self.assertIn('href="#goal-everything"', self.page)
        self.assertIn('data-goal-panel="everything"', self.page)

    def test_the_page_is_only_the_goal_path(self):
        index = (ROOT / "index.html").read_text()
        self.assertEqual(index.count("{% include"), 1)
        self.assertIn("{% include goals.html %}", index)


class ProofContractTests(unittest.TestCase):
    def setUp(self):
        self.data = load("course_audience.yml")
        self.verified = {x["label"]: x for x in self.data["verified"]}

    def test_unmeasured_outcomes_are_named_and_carry_no_number(self):
        self.assertEqual(
            self.data["pending"],
            ["Enrollments per cohort", "Module completions", "Employment within 12 months"],
        )
        for item in self.data["pending"]:
            self.assertFalse(any(ch.isdigit() for ch in item.replace("12 months", "")))
        self.assertTrue(set(self.data["pending"]).isdisjoint(self.verified))

    def test_verified_figures_keep_their_denominators_and_caveats(self):
        self.assertIn("592", self.verified["Mid-level and above"]["detail"])
        self.assertIn("565", self.verified["Work in data engineering"]["value"])
        self.assertIn("not a completion", self.verified["Module 3 homework submitters"]["detail"])
        self.assertIn("Not verified graduates", self.verified["Final-project submitters"]["detail"])

    def test_no_case_studies_testimonials_or_personal_data_in_the_kit(self):
        sources = [p for d in ("_data", "_includes", "_layouts") for p in (ROOT / d).iterdir()]
        sources.append(ROOT / "index.html")
        names = {p.name for p in sources}
        self.assertFalse(names & {"case_study.yml", "testimonials.yml", "proof.html"})
        for path in sources:
            text = path.read_text().lower()
            with self.subTest(path=path.name):
                self.assertNotIn("case study", text)
                self.assertNotIn("airflow", text)
        proof = yaml.safe_dump(self.data)
        self.assertNotIn("@", proof)
        self.assertNotIn("github.com/", proof)


if __name__ == "__main__":
    unittest.main()
