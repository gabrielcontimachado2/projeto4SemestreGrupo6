# Generated by Django 3.2.3 on 2021-06-18 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adopetGeral', '0009_remove_blog_criacao'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='dataCriacao',
            field=models.DateField(help_text='dd/mm/aaaa', null=True, verbose_name='Data criação'),
        ),
    ]