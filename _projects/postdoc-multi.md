---
title: "PostDoc-Multi"
project_id: postdoc-multi # ID of the project, used by publications to display in this project.
belongs_to_areas: [mobile-manipulation] # List of area IDs, separated by commas.
date: 2014-09-01
end_date: 2016-08-31
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  This project focuses on developing methods to validate driving safety for autonomous vehicles and ensure that at each time instance, the vehicle should not have a high probability of colliding with a traffic participant. This is done using reachability analysis and developing probabilistic risk metrics capable of identifying potential crashes in advance. 
image: /assets/images/projects/postdoc-multi.png
links: # If you have a website for the project, repos, etc. put it here.
    # - name: "Github: multi-robot collision avoidance"
    #   url: "https://github.com/tud-amr/mrca_vc"
    # - name: "Github: MPCC implementation"
    #   url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This project is funded at MIT by ONR, SMART and The Boing Company
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
    - name: Prof. Javier Alonso-Mora
      # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
    - name: Prof. Daniela Rus
      extra_info: Massachusetts Institute of Technology (MIT)
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Multi-robot teams can be employed for various tasks, such as surveillance, inspection, and automated factories. In these scenarios, robots may be required to navigate in formation, for example, to maintain a communication network, to collaboratively manipulate an object, or to survey an area. In the near future, assembly systems will incorporate mobile robots to make manufacturing adaptable to changing circumstances, including the manipulation of soft objects that require many hands to control. Within multi-robot navigation, formation control and reconfiguration in presence of moving obstacles remains challenging. This project aims to build a method for collaborative manipulation of objects having variable shape. Various optimization techniques are used to provide good computational efficiency and build algorithms which enable a team of robots to navigate in formation.

The first contribution from this project is a method that can optimise the parameters for a manipulator formation to help avoid moving obstacles and progress towards the goal. This method helps guarantee that the team of mobile robots will not collide with obstacles and a global path planner is provided to build a graph of feasible robot formations. This approach is validated with both a team of aerial vehicles as well as with three mobile manipulators that carry a rigid object. 

Another contribution of this project was a local planner that helps in collaborative manipulation of deformable objects.Constraints for both collision avoidance and manipulation are seamlessly integrated in velocity space and a convex optimization is solved. The planner has a constraint to maintain the shape of the object as well. This method can also be used in cases where human operators and manipulators work together to carry an object. In this case either the human trajectory must be known in advance or the human operator acts as the leader while manipulators try to minimise velocity change. The proposed planner has been tested in experiments with a set of deformable objects like rope, foam mat, bed sheet and a bath towel using two to three mobile manipulators.




## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kxRu426UVdM?si=RwTIl8SdIDAUSD5B&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/sDNqdEPA7pE?si=30btkH8z2rrI3HUR&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project is funded at MIT by ONR, SMART and The Boing Company
