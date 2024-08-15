---
title: "Multi Agent Motion Planning"
project_id: phd-mp # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles,flying-robots] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, the focus is on enabling mobile robots to coexist with humans by developing novel control and communication methods to demonstrate safe motion in dynamic environments. These methods are then tested in real-life situations using autonomous boats navigating in canals and autonomous cars which will drive in an urban environment.  
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

In a modern day smart city, a mobile robot needs to coexist with humans and other robots in a cluttered and dynamic environment. In the near future, fleets of autonomous boats and cars will be used for mobility on-demand. However, this would require developing control and communication methods which work for a variety of robotic systems and most importantly can be used in an ever changing surrounding. Previous research methods have typically focused on low speed operation and highly simplistic environments which are not obtained in real-life. This project focuses on high performance motion planning methods which can safely operate during a realistic demonstration and be used in a variety of challenging situations. 

The key challenge involved during this decision making problem is to develop algorithms which in real-time can yield safe motion by selecting a socially intuitive path from the large number of possibile trajectories. In this regard, one algorithm that has been developed is the Model Predictive Contouring Control (MPCC) which provides real-time collision free navigation for robots in presence of other agents in an environment. This motion planner can be used to encode human-like driving behavior using machine learning techniques. This entire solution can be fully implemented on board of the robot and has been tested using various experimental setups to ensure smooth operation.  

Another significant contribution has been to develop decentralized and communication free collision avoidance for multi-robot systems which can be utilised in autonomous fleet operation. This method is termed buffered uncertainty-aware voronoi cells(B-UAVC) and computes a safe region for any  number of robots such that it can navigate in complex surroundings. This method is both scalable and robust to sensing uncertainties and has been tested through several experiments conducted in the lab.   

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/seMRMa82FzA?si=SvNQuZQg2bRRYltG&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/s9lvMvFcuCE?si=6g3MYMGtXsAh5FAb&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project has received funding from the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the NWO. Neither the NWO nor the granting authority can be held responsible for them.
