---
title: Yet another MSc Project Example about the development of a new algorithm for the planning and control 
direct_supervisors: 
    - name: Javier Alonso-Mora
      # url: "/"
# If you want to use this webiste as the proposal document, comment the proposal_document, just write in the body of the document with markdown
# proposal_document: /assets/files/student_projects/Brochure_thesis_jam.pdf
display: true # Do you want to display this project in the table? (true/false)
---

<!-- # Title will be added automatically -->

## Description

This is an example of an MSc project. The project is about the development of a new algorithm for the planning and control of autonomous vehicles. The project will be developed in the context of the [Delft Robotics Institute](https://www.tudelft.nl/robotics-institute/). The project will be supervised by Prof. J. Alonso-Mora and Supervisor 2.

## Requirements

$$ \frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla) \mathbf{u} = -\frac{1}{\rho} \nabla p + \nu \nabla^2 \mathbf{u}  $$

## Images

<!-- Lazy way to create an array of image indexes. You can define the variable in your front matter for a more clean way -->
{% assign image_list = "/assets/images/msc_projects/msc_project_template/hackathon-team.jpg,/assets/images/msc_projects/msc_project_template/hackathon-team.jpg,/assets/images/robots/dingo_kinova.mp4"  | split: ',' %}

<!-- This will include the images in a grid of n_columns. Use for 2 or more columns -->
{% include gallery.html images=image_list n_columns=3 %}