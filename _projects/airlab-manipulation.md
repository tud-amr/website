---
title: "AI for Retail: Mobile Manipulation in Dynamic Environments"
project_id: airlab-manipulation # ID of the project, used by publications to display in this project.
belongs_to_areas: [mobile-manipulation] # List of area IDs, separated by commas.
date: 2020-09-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  This project looks into developing novel trajectory generation methods for mobile manipulation in dynamic environments, in the context of retail.

image: /assets/images/projects/airlab.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: Project Website
      url: "https://icai.ai/airlab-delft/"
    # - name: Repository
    #   url: "https://scholar.google.com/citations?user=JydqDdEAAAAJ&hl=en&inst=6173373803492361994&oi=ao"
fundings: This project is funded by Ahold Delhaize.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Max Spahn
      # extra_info: PhD candidate
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
    # - name: Andres Fielbaum
    #   extra_info: Key collaborator
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Mobile manipulators are commonly used in close proximity to each other as well as to other objects including humans. This helps improve efficiency and enables these robotic systems to be used for execution of complex tasks. However, this requires obtaining viable trajectories for multiple robots in an ever-changing environment. The AI for Retail (AIR) Lab Delft is a joint TU Delft-Ahold Delhaize industry lab which focuses on building methods to tackle such problems while testing it in a retail grocery store environment. As part of the project, we develop novel methods for trajectory generation for mobile manipulation. In the context of retail environments, it is especially important to generate motions that are safe in the proximity of humans.

Multi-robot motion planning often suffers from high computational costs especially when dealing with large number of robots. The ability of these methods to adapt online in real-time becomes essential. This project introduced multi-robot dynamics fabrics(MRDF) which builds upon dynamic fabrics that are based on local planning using a differential equation. The proposed method can be used for replanning at higher frequencies making it advantageous for complex systems in dynamic environments. Simulation experiments are performed with multiple manipulators in close proximity performing a pick-and-place task. Results highlighted the success of this approach and a significant reduction in computation time making it realistic for real-time local motion planning. 

In addition to this, the project also introduced a reactive task and motion planning (TAMP) method which can cope with unforeseen disturbances during runtime. This is done by firstly developing a high-level planner that can sample parallel motion plans to minimise the cost function and computes control input. A behavior tree guides the search which allows real-time high level planning and alternatives can be used in case of disturbances. The main strength of this method is it's ability to reason over the discrete alternatives at the motion planning level. The method was tested for push-pull and object stacking tasks which showed it's ability to deal with corner cases and also solve these tasks with various grasp strategies and severe disturbances.    

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/jaJBrSecDcM?si=rIBE3gVqIPp7LqCT&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/7kcWaBtXvwc?si=XP6ezR21iqkwH-zf&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project has been funded by Ahold Delhaize.
