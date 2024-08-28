---
title: "Multi Agent Motion Planning"
project_id: phd-mp # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles,flying-robots] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, the focus is on building motion planning methods for multi-robot coordination. Often times methods that work well for single robots do not scale well with increasing robot density. Here, the focus is on both car-like robots and aerial vehicles and the developed methods have been tested through several experiments to ensure effective performance. 
image: /assets/images/projects/phd-mp.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: multi-robot collision avoidance"
      url: "https://github.com/tud-amr/mrca_vc"
    - name: "Github: MPCC implementation"
      url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This project is funded by the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
      # extra_info: PhD candidates
    - name: Hai Zhu
      extra_info: PhD Candidate
    - name: Bruno Brito
      extra_info: PhD Candidate
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Multi-robot systems are designed to achieve tasks by collaboration. A key requirement for their efficient operation is good coordination and collision avoidance. Various methods have previously been proposed for single robot cases but when applied to multi-robot systems they often are computationally expensive. This project proposes novel collision avoidance strategies for a group of non-holonomic robots such as non-holonomic optimal reciprocal collision avoidance(NH-ORCA). A set of planners are developed for aerial vehicles as well that have low-computational complexity. 

NH-ORCA works by controlling robots to stay within a maximum tracking error of the ideal trajectory. This builds on an approach called ORCA which worked well for holonomic robots. NH-ORCA is a fast and distributed method that can deal with crowded situations as well and helps robotic systems achieve smooth and visually appealing trajectories. Several experiments are conducted and recorded with a number of non-holonomic puck robots which help demonstrate the effectiveness of this method. 

Another contribution of this project was the development of methods based on Velocity Obstacles(VO) to provide real-time motion planning for quadrotors. This provides a local motion planner which considers motion constraints, static obstacles and other agents. The approaches are either centralised or distributed and have been applied to varying sizes of quadrotor agent groups. Succesful performance was shown in these experiments with up to four quadrotors in close proximity and including humans.  

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/seMRMa82FzA?si=SvNQuZQg2bRRYltG&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/s9lvMvFcuCE?si=6g3MYMGtXsAh5FAb&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Partners

