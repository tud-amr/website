---
title: "VENI: Accurate Control of Aerial Robotic Manipulators under Uncertainties "
project_id: veni-sihao # ID of the project, used by publications to display in this project.
belongs_to_areas: [flying-robots, mobile-manipulation] # List of area IDs, separated by commas.
date: 2024-01-17 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  Aerial manipulators as flying hands can manipulate objects in the air, which is a key capability for applications such as aerial delivery, nondestructive inspection, and infrastructure maintenance. However, aerial manipulators are subject to dynamical uncertainties, which can lead to inaccurate control and unstable operation. This project aims to develop planning and control algorithms that enable aerial manipulators to perform accurate, agile, and safe manipulation of tasks in the presence of strong dynamical uncertainties, such as wind gusts, unknown contact wrenches, load variations, and even system failures. 
image: /assets/images/projects/veni-sihao/osprey.jpeg
fundings: This project is funded by the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 20256
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Dr. Sihao Sun
      extra_info: Principal Investigator
    - name: Prof. Javier Alonso-Mora
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Aerial manipulators, often described as “flying hands,” can manipulate objects in midair. This is a key capability for applications such as aerial delivery, nondestructive inspection, and infrastructure maintenance. However, they are subject to significant dynamical uncertainties, which can lead to inaccurate control and unstable operation. This project aims to develop planning and control algorithms that enable aerial manipulators to perform accurate, agile, and safe manipulation tasks despite strong dynamical uncertainties, including wind gusts, unknown contact wrenches, load variations, and even system failures.

In particular, the project will leverage incremental nonlinear flight control and incremental nonlinear modeling techniques to establish a theoretical foundation for integrating incremental nonlinear flight control with various outer-loop control strategies. These include impedance control, model predictive control, and learning-based control, especially for contact-based operations where aerial manipulators experience strong dynamic coupling with manipulated objects and the environment.

Furthermore, the project will establish a comprehensive experimental validation framework to test and verify the proposed algorithms in real-world scenarios. This will be achieved through the development of novel aerial manipulator platforms that balance system complexity and performance in contact-rich aerial manipulation tasks.

## Funding & Partners

This project is funded by the Dutch Research Council (NWO).

## Project Demonstrations
<div class="video-wrapper ratio ratio-16x9">
  <video id="teaser1" autoplay="" muted="" controls="" loop="" playsinline="">
    <source src="{% include fix_link.html link='/assets/images/papers/camls-agile/video_camls_agile.mp4' %}" type="video/mp4">
  </video>
</div>