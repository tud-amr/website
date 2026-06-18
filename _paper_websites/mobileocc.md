---
title: "MobileOcc: A Human-Aware Semantic Occupancy Dataset for Mobile Robots"
authors:
  - name: "Junseo Kim"
    url: "https://kimjunseo.com/"
    superscript: "1*"
  - name: "Guido Dumont"
    url: "https://www.linkedin.com/in/guido-dumont-b722a5182/"
    superscript: "1*"
  - name: "Xinyu Gao"
    url: "https://www.linkedin.com/in/xinyu-gao-mar2000/"
    superscript: "1*"
  - name: "Gang Chen"
    url: "https://g-ch.github.io/"
    superscript: "1*"
  - name: "Holger Caesar"
    url: "https://sites.google.com/it-caesar.de/homepage/"
    superscript: "1"
  - name: "Javier Alonso-Mora"
    url: "https://autonomousrobots.nl/people/"
    superscript: "1"
affiliations:
  - name: "TU Delft"
    superscript: "1"
    url: "https://tudelft.nl"
  - name: "Equal Contributions"
    superscript: "*"
  release_date: 2026-03-06 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
  links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: Paper (arXiv)
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2511.16949"
    - name: Code (coming soon)
      icon: bi-github
      url: "https://github.com/tud-amr/MobileOcc"
    - name: Dataset
      icon: bi-github
      url: "https://github.com/tud-amr/MobileOcc" # TODO: replace with dataset link
  related_project_id: "interact"
  # hidden: true # Only accessible via direct link, not listed or indexed
  sitemap: false # Exclude from sitemap
---

<style>
  ol.figure-list {
    list-style-type: none;
    counter-reset: list-counter;
    padding-left: 10px;
  }
  ol.figure-list li::before {
    counter-increment: list-counter;
    content: "(" counter(list-counter, lower-alpha) ")";
    padding-right: 8px;
  }
</style>

<hr/>

<h2 align="center"><u>Abstract</u></h2>
  <p align="justify">
  Dense 3D semantic occupancy perception is critical for mobile robots operating in pedestrian-rich environments, yet it remains underexplored compared to its application in autonomous driving. To address this gap, we present <b>MobileOcc</b>, a semantic occupancy dataset for mobile robots operating in crowded human environments. Our dataset is built using an annotation pipeline that incorporates static object occupancy annotations and a novel mesh optimization framework explicitly designed for human occupancy modeling. It reconstructs deformable human geometry from 2D images and subsequently refines and optimizes it using associated LiDAR point data. Using MobileOcc, we establish benchmarks for two tasks: i) occupancy prediction and ii) pedestrian velocity prediction, using different methods, including monocular, stereo, and panoptic occupancy, with metrics and baseline implementations for reproducible comparison. Beyond occupancy prediction, we further assess our annotation method on 3D human pose estimation datasets, where results demonstrate robust performance across different datasets.
  </p>

<!-- <h2 align="center"><u>Overview</u></h2> -->
  <div class="row justify-content-center">
    <div class="col-8 col-md-6">
      <img src="/assets/images/paper/mobileocc/first_figure.png" width="100%">
    </div>
  </div>

<p align="justify">
  In the figure above, we show qualitative results across occupancy resolutions. <b>Top:</b> input image from the UT Campus Object Dataset (CODa). <b>Middle:</b> our semantic occupancy label at fine resolution (0.02 m). <b>Bottom:</b> semantic occupancy at coarse resolution (0.2 m). Gray voxels denote unknown regions, whereas free space is not shown for clarity. Unlike driving-oriented datasets that model humans as rigid boxes, MobileOcc preserves limb-level geometry that is critical for navigation in tight crowd gaps. Below we show the annotation pipeline of our method.
  </p>

<div class="row">
    <div class="col-12">
      <img src="/assets/images/paper/mobileocc/pipeline.png" width="100%">
    </div>
  </div>

<p align="justify">
  Overview of the MobileOcc pipeline. Given synchronized image streams and LiDAR along a robot trajectory, the pipeline performs <b>data preprocessing</b>, <b>static mapping</b>, <b>human mesh optimization</b>, and <b>3D occupancy representation</b> generation. Static voxel colors follow the Cityscapes labeling scheme, human instances are assigned distinct colors, and unknown regions are shown in gray. In human mesh optimization, the green and red skeletons represent the ground-truth and the predicted 3D pose of the mesh, respectively.
  </p>

<p align="justify">
  Our main **contributions** include:
  </p>
  <p align="justify">
  (1) We introduce <b>MobileOcc</b>, a 3D semantic occupancy prediction dataset built on raw sensor data from the UT Campus Object Dataset (CODa) for mobile robots navigating among near-field pedestrians.
  </p>
  <p align="justify">
  (2) We develop an annotation pipeline that generates occupancy annotations from synchronized RGB images and dense LiDAR data. In particular, it leverages both image data and LiDAR point clouds through a training-free mesh optimization framework to produce accurate, non-rigid representations of human occupancy.
  </p>
  <p align="justify">
  (3) We establish MobileOcc as a benchmark suite by evaluating existing occupancy frameworks on two tasks: i) semantic occupancy prediction and ii) pedestrian velocity prediction, with baselines across monocular, stereo, and panoptic occupancy methods.
  </p>

<hr/>
  <h2 align="center"><u>Dataset</u></h2>

<p align="justify">
  MobileOcc is annotated on the CODa dataset and output in the nuScenes format for easy integration with existing tools. We evaluate at 0.2 m voxel resolution over a grid spanning x &isin; [0.4, 10.0] m, y &isin; [&minus;4.8, 4.8] m, z &isin; [&minus;1.0, 3.8] m, downsampled to 5 Hz. The training/validation split contains 92,303 / 24,208 frames (79% / 21%), of which 30,457 / 7,165 contain pedestrian annotations. We use 10 semantic classes (one free-space and nine occupied: pedestrian, car, other-structure, pole, road, terrain, truck, two-wheeler, vegetation). Compared to existing driving and off-road occupancy datasets, MobileOcc is the first to provide non-rigid human occupancy with per-instance tracking for mobile robot navigation. We distinguish daytime and nighttime sequences, enabling users to select subsets matching their target deployment conditions.
  </p>

<p align="justify">
  To validate label quality, we compare our voxel labels against CODa ground truth on 4 sequences (400 frames). Static semantic voxels reach 71.2 mIoU (road / vegetation / terrain) with 96.8% ground-truth point coverage, and pedestrian voxels achieve 84.4% precision and 81.9% recall against 3D bounding-box references, confirming that our labels capture the majority of pedestrian geometry.
  </p>

<hr/>
  <h2 align="center"><u>Results</u></h2>

<p align="justify">
  We present qualitative results in the following. More quantitative results can be found in the paper.
  </p>

<p align="justify">
  <b>3D occupancy prediction.</b> We compare stereo (VoxFormer-T), monocular FlashOcc, and Panoptic-FlashOcc baselines under various lighting conditions, including sunny, night, and cloudy scenes.
  </p>

<div class="row">
    <div class="col-12">
      <img src="/assets/images/paper/mobileocc/occ_compare1.png" width="100%">
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <img src="/assets/images/paper/mobileocc/occ_compare2.png" width="100%">
    </div>
  </div>
  <p align="justify">
  Qualitative comparison of different baselines. Columns show the stereo (left + right) input, ground-truth occupancy, and predictions from VoxFormer-T, FlashOcc (8f), and Panoptic-FlashOcc (8f).
  </p>

<p align="justify">
  <b>Panoptic occupancy.</b> Beyond per-voxel semantics, Panoptic-FlashOcc predicts voxel-level panoptic labels, separating individual pedestrian instances within the scene.
  </p>

<div class="row">
    <div class="col-12">
      <img src="/assets/images/paper/mobileocc/pano1.png" width="100%">
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <img src="/assets/images/paper/mobileocc/pano2.png" width="100%">
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <img src="/assets/images/paper/mobileocc/pano3.png" width="100%">
    </div>
  </div>
  <p align="justify">
  Panoptic occupancy prediction using Panoptic-FlashOcc (8f). Columns show the stereo (left + right) input, ground truth, predicted semantic occupancy, and predicted instances.
  </p>

<p align="justify">
  <b>Pedestrian velocity prediction.</b> Finally, we extend the detection head of Panoptic-FlashOcc to predict per-pedestrian velocities (Panoptic-FlashOcc-vel). Directions are shown using colors and arrows.
  </p>

<div class="row">
    <div class="col-6">
      <img src="/assets/images/paper/mobileocc/flow1.png" width="100%">
    </div>
    <div class="col-6">
      <img src="/assets/images/paper/mobileocc/flow2.png" width="100%">
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <img src="/assets/images/paper/mobileocc/flow3.png" width="100%">
    </div>
    <div class="col-6">
      <img src="/assets/images/paper/mobileocc/flow4.png" width="100%">
    </div>
  </div>
  <p align="justify">
  Pedestrian velocity prediction using Panoptic-FlashOcc-vel (8f). Each panel shows the stereo-left input, ground-truth velocity, and predicted velocity. The model produces plausible velocities for most pedestrians while exhibiting typical failure cases, such as confusion between forward and backward walking directions.
  </p>
</content>
</invoke>
