---
title: "INTERACT: Intuitive Interaction for Robots among Humans"
project_id: interact # ID of the project, used by publications to display in this project.
belongs_to_areas: [social-robots, mobile-manipulation] # List of area IDs, separated by commas.
date: 2023-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, interactions of mobile robots and humans is key. This concept is considered on multiple spatio-temporal granularities ranging from individual interactions to the macro interaction of a robot fleet with humans, and from short term (local) to long term (global) effects of the interaction. 
image: /assets/images/projects/INTERACT_picture.jpg
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: Fabrics Implementation"
      url: "https://github.com/tud-amr/fabrics"
    - name: "Github: multi-agent fabrics"
      url: "https://github.com/tud-amr/multi-robot-fabrics"
fundings: This project is funded the ERC Starting Grant project "Intuitive Interaction for Humans among Robots (INTERACT)". 
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Saray Bakker 
      # extra_info: PhD candidate
    - name: Andreu Matoses Gimenez
      # extra_info: Reliable Control (R2C) Lab TU Delft
    - name: Dr. Clarence Chen
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
    - name: Prof. Wendelin Bohmer 
      extra_info: Key collaborator.
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

INTERACT aims to equip mobile robots with the ability to navigate and operate safely in human-populated environments. Leveraging advancements in motion planning, multi-robot task assignment, and machine learning, this project seeks to overcome the challenges of modeling intuition and ensuring safety in complex, uncertain settings. By developing intuitive models from past interactions and integrating them into novel optimization methods, INTERACT will enable robots to perform seamless, interaction-aware navigation and task planning. This foundational work paves the way for a new era of automation in both industrial and urban settings, where robots and humans can coexist harmoniously.

One recent contribution from this project has been development of task and motion planning (TAMP) algorithms which are used in robotic systems to autonomously decide the high-level actions along with the associated motions. Previous research into TAMP algorithms have several simplifications and often do not account for robot dynamics or issues with low-level controllers. This project uses GPU based physics simulators to find high-quality realizations which can be directly implemented in the real system as it accounts for robot dynamics. Experimental results validated the effectiveness of this algorithm for a pick and place task while finding low-cost feasible solutions in 1-2 minutes. 

Another problem addressed in this project is that of real-time motion planning for multiple robotic manipulators in close proximity of each other. A novel method called multi-robot dynamics fabrics(MRDF) is developed which uses dynamic fabrics that rely on differential equations to solve for local motion planning. This method enables higher replanning frequencies and makes it useful for complex systems in dynamic environments. An online local motion planning algorithm is built that can enable multiple manipulators to operate in a shared workspace. The method is then validated in several pick-and-place scenarios obtaining high success rates and a real-time performance.   



## Project Demonstrations

<div class="ratio ratio-16x9">  
  <iframe src="https://www.youtube.com/embed/AldMFKnlW3M?si=X570HkJbSm7nanBI&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
  </iframe>
</div>

## Funding & Partners

This project has received funding from the European Union through ERC, INTERACT, under Grant 101041863. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them.
