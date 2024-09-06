---
title: "Parallelized Probabilistic Motion Planning in Dynamic Environments"
project_id: probabilistic-planning # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles, social-robots] # List of area IDs, separated by commas.
date: 2020-01-01 # started date, approximated if not sure. Just for display purposes and ordering
end_date: 2024-12-31 # end date if ended, approximated if not sure.
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  This project develops probabilistic motion planners for social robots and automated vehicles. Our main goal is to account for the uncertain future motion of obstacles, such as pedestrians, to plan safe and efficient robot motion.
image: /assets/images/projects/probabilistic-planning/t-mpc.jpg
# links: # If you have a website for the project, repos, etc. put it here.
#     - name: Project Website
#       url: "/"
fundings: This project is funded in part by NWO-TTW within the SafeVRU project.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Oscar de Groot 
      extra_info: PhD candidate
    - name: Prof. Laura Ferranti
    # extra_info: Reliable Control (R2C) Lab TU Delft
    - name: Prof. Dariu Gavrila 
      extra_info: Intelligent Vehicles (IV) Group TU Delft
    - name: Prof. Javier Alonso-Mora
    #  extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->


## About the Project
This project develops probabilistic motion planners for social robots and automated vehicles. Our main goal is to account for the uncertain future motion of obstacles, such as pedestrians, to plan safe and efficient robot motion. This uncertainty, in practice, stems from the fact that the robot cannot observe the intentions of humans with certainty. It therefore needs to account for plausible outcomes when making a decision.

We developed two model-based planning frameworks in this project:
- **Scenario-Based Trajectory Optimization:** To account for uncertainty associated with motion predictions of dynamic obstacles,
- **Topology-Driven Trajectory Optimization:** To parallelize existing optimization-based planners, such as scenario-based planning.

<!-- ### Scenario-Based Trajectory Optimization

<div class="d-flex flex-row gap-2 flex-wrap justify-left mb-4 mt-4">
  <!-- <a itemprop="url" href="https://www.nwo.nl/en/projects/14667"> -->
  <!-- <img class="img-flex" height="250" src="{% include fix_link.html link='/assets/images/projects/probabilistic-planning/sh_mpc.png' %}" alt="Safe Horizon MPC"> -->
  <!-- </a> -->
<!-- </div> --> 
The main idea behind scenario-based planning is to sample from the distribution of the uncertainty. Each sample represents a possible future trajectory of the obstacle. We enforce collision constraints with all samples to account for the uncertainty. By sampling, we can handle any type of distribution, making the approach widely applicable. The more samples are taken, the safer our motion plan becomes. Scenario-based trajectory optimization plans probabilistic safe trajectories in real-time while incorporating generic uncertainties associated with the future motion of dynamic obstacles.

<!-- ### Topology-Driven Trajectory Optimization

<div class="d-flex flex-row gap-2 flex-wrap justify-left mb-4 mt-4">
  <!-- <a itemprop="url" href="https://www.nwo.nl/en/projects/14667"> -->
  <!-- <img class="img-flex" height="250" src="{% include fix_link.html link='/assets/images/projects/probabilistic-planning/t-mpc.jpg' %}" alt="Safe Horizon MPC"> -->
  <!-- </a> -->
<!-- </div> -->

Many existing planners, in particular optimization-based methods, plan only a single trajectory. They rely on this one plan to remain safe and efficient and tend not to explore other options. Topology-driven trajectory optimization proposes a framework to parallelize existing optimization-based planners, computing several distinct trajectories that each pass the obstacles in a different way. This leads to faster motion plans without compromising on safety.

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/_zOFbl39lwc?si=ov8FtiOXh4i2QdEs&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/TVAcPJ8tYho?si=v_kmyVxQ0VyOSRAL&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Partners

<div class="d-flex flex-row gap-2 flex-wrap justify-left mb-4 mt-4">
  <a itemprop="url" href="https://www.nwo.nl/en/projects/14667">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/probabilistic-planning/nwo.png' %}" alt="NWO-TTW Project SafeVRU">
  </a>
</div>
