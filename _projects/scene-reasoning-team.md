---
title: "Distributed high-level scene reasoning with teams of heterogeneous robots"
project_id: scene-reasoning-team # ID of the project, used by publications to display in this project.
belongs_to_areas: [flying-robots] # List of area IDs, separated by commas.
date: 2020-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  In this project, we explore how a team of diverse robots can collaboratively monitor complex environments, such as bustling seaports or major city events. Equipped with varied sensors like cameras and microphones, each robot gathers data from its unique perspective...
image: /assets/images/projects/MC_tracking_class.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: Active Information gathering
      url: "https://github.com/tud-amr/mGP_planner"

    - name: Risk-aware spatio-temporal(RAST)
      url: "https://github.com/tud-amr/RAST_corridor_planning"
fundings: This project is funded by the Office of Naval Research Global (ONRG) of the US.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Alvaro Serra-Gomez
    - name: Hai Zhu
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

In this project, we explore how a team of diverse robots can collaboratively monitor complex environments, such as bustling seaports or major city events. Equipped with varied sensors like cameras and microphones, each robot gathers data from its unique perspective. While some advancements exist in robots reaching consensus on basic features, integrating high-level reasoning with diverse sensing remains a challenge. This is essential when deploying a team of robots in dynamic environments for autonomous navigation in applications like search and rescue, multi-view videography and inspection. 

One contribution from this project is an interaction and obstacle aware trajectory prediction model which when combined with a model predictive controller(MPC) achieves multi-robot motion planning. This is done by building a neural network model which is trained on a dataset of robot trajectories generated using a simulator. This model is used to predict the planning behavior of robots and help provide robot trajectory predictions in a multi-robot scenario. This is then fed to an MPC framework which is used as the local motion planner. Experiments were conducted using a team of quadrotors which had to fly in a space shared with human obstacles. The quadrotors were able to keep a safe distance to each human obstacle while following the proposed trajectory. 

This project also addresses the problem of videography drone teams that have to autonomously capture desired shots of a dynamic target in a complex environment. A two-stage planning pipeline is proposed whereby a high level planner uses a visibility heuristic to choose when each drone should capture which shot. This results in a reference trajectory which is tracked by an online Model Predictive Control (MPC) algorithm which uses a cost function for viewpoint parameters. Demonstrations are then conducted for a videography scenario with a pair of drones assigned to capture shots of a remote controlled car in the presence of obstacles.   

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/i8HRGeOmcH4?si=COecj8PCN767M3nC&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/nZaR-8Z515s?si=4fsQENWa22gzGeVy&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project has received funding from the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the NWO. Neither the NWO nor the granting authority can be held responsible for them.
