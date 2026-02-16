from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data (delete individually to avoid Djongo ObjectIdField bug)
        for model in [User, Team, Activity, Leaderboard, Workout]:
            for obj in model.objects.all():
                obj.delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Create activities
        Activity.objects.create(user=tony, type='Run', duration=30)
        Activity.objects.create(user=steve, type='Swim', duration=45)
        Activity.objects.create(user=bruce, type='Cycle', duration=60)
        Activity.objects.create(user=clark, type='Yoga', duration=20)

        # Create workouts
        Workout.objects.create(user=tony, description='Chest day', duration=60)
        Workout.objects.create(user=steve, description='Leg day', duration=50)
        Workout.objects.create(user=bruce, description='Cardio', duration=40)
        Workout.objects.create(user=clark, description='Strength', duration=55)

        # Create leaderboard
        Leaderboard.objects.create(user=tony, points=100)
        Leaderboard.objects.create(user=steve, points=90)
        Leaderboard.objects.create(user=bruce, points=95)
        Leaderboard.objects.create(user=clark, points=85)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
