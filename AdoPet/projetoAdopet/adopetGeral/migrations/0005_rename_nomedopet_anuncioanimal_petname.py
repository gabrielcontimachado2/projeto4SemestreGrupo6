# Generated by Django 3.2.3 on 2021-06-22 10:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adopetGeral', '0004_alter_anuncioanimal_nomedopet'),
    ]

    operations = [
        migrations.RenameField(
            model_name='anuncioanimal',
            old_name='nomedopet',
            new_name='petName',
        ),
    ]