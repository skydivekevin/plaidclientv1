const mapEnumToLabel = (enumValue) => {
    switch (enumValue) {
      case 'INTERIOR_SERVICES':
        return "Interior Services";
      case 'EXTERIOR_SERVICES':
        return "Exterior Services";
      case 'ELECTRICAL':
        return "Electrical";
      case 'PLUMBING':
        return "Plumbing";
      case 'HVAC':
        return "HVAC";
      case 'PEST_CONTROL':
        return "Pest Control";
      case 'PRESSURE_WASHING':
        return "Pressure Washing";
      case 'HANDYMAN':
        return "Handyman";
      case 'INTERIOR_CLEANING':
        return "Interior Cleaning";
      case 'CARPET_CLEANING':
        return "Carpet Cleaning";
      case 'LAWN_MAINTENANCE':
        return 'Lawn Maintenance';
      case 'WINDOW_CLEANING':
        return 'Window Cleaning';
      case 'GUTTER_CLEANING':
        return 'Gutter Cleaning';
      case 'POOL_MAINTENANCE':
        return 'Pool Maintenance';
      case 'GARAGE_DOORS':
        return 'Garage Door Service';
      case 'FLOORING':
        return 'Flooring';
      case 'PAINTING_INTERIOR':
        return 'Interior Painting';
      case 'PAINTING_EXTERIOR':
        return 'Exterior Painting';
      case 'ENVIRONMENTAL':
        return 'Environmental';
      default:
        return enumValue;
    }
  }
  exports.mapEnumToLabel = mapEnumToLabel

  const mapEnumToSpecialist = (enumValue) => {
    switch (enumValue) {
      case 'INTERIOR_SERVICES':
        return "Interior Services";
      case 'EXTERIOR_SERVICES':
        return "Exterior Services";
      case 'ELECTRICAL':
        return "Electrician";
      case 'PLUMBING':
        return "Plumber";
      case 'HVAC':
        return "HVAC Specialist";
      case 'PEST_CONTROL':
        return "Pest Control Specialist";
      case 'PRESSURE_WASHING':
        return "Pressure Washer";
      case 'HANDYMAN':
        return "Handyman";
      case 'INTERIOR_CLEANING':
        return "Interior Cleaner";
      case 'CARPET_CLEANING':
        return "Carpet Cleaner";
      case 'LAWN_MAINTENANCE':
        return 'Lawn Maintenance Specialist';
      case 'WINDOW_CLEANING':
        return 'Window Cleaner';
      case 'GUTTER_CLEANING':
        return 'Gutter Cleaner';
      case 'POOL_MAINTENANCE':
        return 'Pool Maintenance Specialist';
      case 'GARAGE_DOORS':
        return 'Garage Door Service Specialist';
      case 'FLOORING':
        return 'Flooring Specialist';
      case 'PAINTING_INTERIOR':
        return 'Interior Painter';
      case 'PAINTING_EXTERIOR':
        return 'Exterior Painter';
      case 'ENVIRONMENTAL':
        return 'Environmental Specialist';
      default:
        return enumValue;
    }
  }
  exports.mapEnumToSpecialist = mapEnumToSpecialist;

  const mapJobStatus = (enumValue) => {
    switch (enumValue) {
      case 'REQUESTED':
        return "Requested";
      case 'ACCEPTED':
        return "Accepted";
      case 'SCHEDULED':
        return "Scheduled";
      case 'COMPLETED':
        return "Completed";
      case 'CANCELLED':
        return "Cancelled";
      default:
        return enumValue;
    }
  }
  exports.mapJobStatus = mapJobStatus