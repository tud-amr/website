---
title: "Game-Theoretic Motion Planning for Multi-Agent Interaction"
project_id: game-theoretic-mp # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles, social-robots] # List of area IDs, separated by commas.
date: 2022-06-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
   This project brings tools from the field of dynamic game theory to robotic motion planning. This combination enables new motion-planning algorithms that allow a robot to strategically interact with other agents while accounting for their unknown—potentially malicious—intents. 
image: /assets/images/projects/gtmotion_planning.svg
links: # If you have a website for the project, repos, etc. put it here.
    - name: Project Website
      url: "https://andreumatoses.github.io/"
    - name: Repository
      url: "https://scholar.google.com/citations?user=JydqDdEAAAAJ&hl=en&inst=6173373803492361994&oi=ao"
fundings: 
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Lasse Peters 
      # extra_info: website here?
    - name: Prof. Laura Ferranti
      # extra_info: Reliable Control (R2C) Lab TU Delft
    - name: Prof. Javier Alonso-Mora
      # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

In order for robots to be helpful companions in our everyday lives, they must be able to operate outside of cages, alongside humans and other robots. This achievement would allow to deploy robots in a much greater set of applications than the ones that we seeing today with opportunities ranging from from autonomous driving in urban dense urban traffic to automation of hospital logistics. A key requirement to achieve this goal is the problem of safe and efficient motion planning in interaction with other decision-making entities. This requirement poses a particular challenge when the robot cannot directly communicate with other agents. In such a scenario, it is of utmost importance that autonomous agents understand the effect of their actions on the decisions of others.

A principled mathematical framework for modeling such interaction of multiple agents over time is provided by the field of dynamic game theory. In this framework, agents are modeled as rational decision-making entities with potentially differing objective whose actions affect the evolution of the state of a shared environment. The flexibility of this framework allows to capture a wide range of aspects and challenges common to real-world interactions, including noncooperative behavior, bounded rationality, and dynamic evolution of potentially imperfect and incomplete information available to each player. When solved to a generalized equilibrium concept, these problems can not only account for interdependence of preference but also for interdependence of feasible actions, e.g., collision avoidance constraints. This vast modeling capacity makes dynamic game theory an attractive framework for autonomous planning in the presence of other agents.

The goal of this project is to push the state-of-the-art in motion planning for multi-agent interaction by combining game-theoretic approaches with learning-based techniques. Through this combination, we aim to develop algorithms that admit autonomous strategic decision-making in realis- tic real-world scenarios with limited computational resources.
