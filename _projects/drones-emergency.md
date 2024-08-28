---
title: "Autonomous Drones for Emergency Responders"
project_id: drones-emergency # ID of the project, used by publications to display in this project.
belongs_to_areas: [flying-robots] # List of area IDs, separated by commas.
date: 2022-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  How can autonomous drones support operations of emergency responders such as the police?
  This project targets scenarios such as search and rescue or reconnaissance in large, unknown and potentially hazardous environments, where it can be difficult or even dangerous for policemen to operate and fulfil the task.
image: /assets/images/projects/police/Environment_exploration_drones.png
# links: # If you have a website for the project, repos, etc. put it here.
#     - name: Project Website
#       url: "/"
fundings: This project is funded by the National Police (Politie) of the Netherlands.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Dennis Benders 
      extra_info: PhD candidate
    - name: Max Lodel 
      extra_info: PhD candidate
    - name: Thijs Niesten 
      extra_info: Research Engineer
    - name: Prof. Laura Ferranti
      extra_info: Reliable Control (R2C) Lab TU Delft
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
    - name: Prof. Robert Babuska 
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

How can autonomous drones support operations of emergency responders such as the police? This project targets scenarios such as search and rescue or reconnaissance in large, unknown and potentially hazardous environments, where it can be difficult or even dangerous for policemen to operate and fulfil the task themselves. In this project we aim to enable drones to operator in such remote environments and gather information required by police operators. We develop methods to control entire teams of drones, so they can fly safely between obstacles and are robust to unexpected disturbances, and can navigate unknown environments to provide the required information.

Search missions require motion planning and navigation methods for information gathering that continuously replan based on new observations of the robot's surroundings. Current methods for information gathering are capable of reasoning over long horizons, but they are computationally expensive. To overcome these limitations we train an information-aware policy via deep reinforcement learning, that guides a trajectory optimization planner. In particular, the policy continuously recommends a reference viewpoint to the local planner, such that the resulting collision-free trajectories lead to observations that maximize the information gain and reduce the uncertainty about the environment. In simulation tests in previously unseen environments, the proposed method consistently outperforms greedy next-best-view policies in terms of information gains and coverage time, with a reduction in execution time by three orders of magnitude.

Another contribution from this project is a novel method that aims at understanding the objectives of each agent in a multi-agent setting based on the observed interactions. These objectives can be obtained using noisy and partial state observations. This is beneficial in several scenarios where different agents need to interact with other agents in it's environment. Consider a traffic scenario where drivers are performing lane changes. Such a setting requires a driver to understand the behavior of others as well so that a safe distance can be maintained without compromising on speed. The proposed method can identify unknown parameters of each agent's cost function based on the observatiosn so that the future trajectories or states of each agent can be predicted directly.  



## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/qxabfC9I66k?si=gbRGsmdQWxoW44HI&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<!-- <div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/sDNqdEPA7pE?si=30btkH8z2rrI3HUR&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div> -->

## Funding & Partners

This project has received funding from the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the NWO. Neither the NWO nor the granting authority can be held responsible for them.