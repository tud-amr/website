---
title: "Future transport systems: On-Demand Ridepooling "
project_id: ridepooling # ID of the project, used by publications to display in this project.
belongs_to_areas: [transportation] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
# end_date: 2024-01-01 # end date if ended, approximated if not sure.
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  Routing and analysis of on-demand ridepooling systems, and integration into public transport. 
image: /assets/images/projects/on_demand_taxis.jpg
links: # If you have a website for the project, repos, etc. put it here.
    # - name: Project Website
    #   url: "/"
fundings: This project is funded in part by Didi Udian Technologies Shenzhen.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Dr. Andres Fielbaum
      extra_info: Postdoctoral researcher
    - name: Prof. Javier Alonso-Mora
    #  extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

On-demand mobility systems are expanding worldwide. Ride pooling services are transforming urban mobility as they allow several passengers to share a vehicle when traveling along similar routes. While most ride-pooling services currently focus on drivers to operate these vehicles, there is a push in the industry towards self-driving vehicles which can provide safe, reliable and affordable transporation. In this project, the algorithmic and operational challenges of such a technology is explored with a goal to help improve public transport. 

One contribution of this project was a study into understanding user benefit by adopting ride pooling services. This is done by building a mathematical function where the added travel time and discomfort have to be compensated by a price discount. This approach is then used in a series of experiments which highlighted that distance savings of the magnitude previously shown in research can only be obtained based on the user willingness to share and the discounts offered to them. If a user is unwilling to share their ride, a higher discount rate might be needed which is higher than the rate currently offered by such services. This highlights the need for future research to look into exploration of advanced discount mechanisms and demand distributions. 

This project also introduced a highly scalable anytime optimal algorithm for ride-sharing which looks at using a fleet of vehicles with varying passenger capacities to assign them to matched passengers and rebalancing this fleet to service demand. In contrast to previous research which is limited to small problem instances, the proposed method is suited for much larger cases such as the entirety of New York City with thousands of vehicles, requests and road segments. Experimental results are conducted using a public dataset from New York with around 3 million rides. The results show that a fleet of just 2000 vehicles was sufficient to meet 98% of the demand with low waiting time and delays.   

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/xHWrRci0H54?si=u6Vs35WfOK3fPhYY&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


## Funding & Partners

This project was funded in part by Didi Udian Technologies Shenzhen.
