from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel.name)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel.name)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc.name)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc.name)

        # Activities
        Activity.objects.create(user=tony.name, type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=steve.name, type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=bruce.name, type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user=clark.name, type='Yoga', duration=20, date=timezone.now().date())

        # Leaderboard
        Leaderboard.objects.create(team=marvel.name, points=150)
        Leaderboard.objects.create(team=dc.name, points=120)

        # Workouts
        Workout.objects.create(name='Super Strength', description='Strength training for heroes', difficulty='Hard')
        Workout.objects.create(name='Flight Training', description='Aerobic workout for flyers', difficulty='Medium')

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
