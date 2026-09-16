// Test script for hallService architecture
async function testService() {
  console.log('--- Testing hallService ---');
  const { getAllHalls, getHallById, createEnquiry } = await import('../src/services/hallService.ts');

  // Test 1: Fetch all halls
  const allHalls = await getAllHalls();
  console.log(`[PASS] getAllHalls() returned ${allHalls.length} venues.`);
  if (allHalls.length < 12) {
    throw new Error(`Expected at least 12 halls, got ${allHalls.length}`);
  }

  // Test 2: Filter by area
  const kanakapura = await getAllHalls({ area: 'Kanakapura Road' });
  console.log(`[PASS] Filter by area 'Kanakapura Road' returned ${kanakapura.length} venues.`);
  if (kanakapura.some((h) => h.area !== 'Kanakapura Road')) {
    throw new Error('Found venue outside Kanakapura Road in filtered result');
  }

  // Test 3: Filter by vegOnly
  const vegHalls = await getAllHalls({ vegOnly: true });
  console.log(`[PASS] Filter vegOnly returned ${vegHalls.length} venues.`);
  if (vegHalls.some((h) => !h.vegOnly)) {
    throw new Error('Found non-veg venue in vegOnly query');
  }

  // Test 4: Filter by minCapacity
  const megaHalls = await getAllHalls({ minCapacity: 1500 });
  console.log(`[PASS] Filter minCapacity: 1500 returned ${megaHalls.length} venues.`);
  if (megaHalls.some((h) => h.capacityMax < 1500)) {
    throw new Error('Venue capacity below minCapacity');
  }

  // Test 5: Sort by price-asc
  const sortedByPrice = await getAllHalls({ sortBy: 'price-asc' });
  console.log(`[PASS] Sorted by price-asc: cheapest is ₹${sortedByPrice[0].pricePerDay}, highest is ₹${sortedByPrice[sortedByPrice.length - 1].pricePerDay}`);
  if (sortedByPrice[0].pricePerDay > sortedByPrice[1].pricePerDay) {
    throw new Error('Venues not sorted by ascending price');
  }

  // Test 6: getHallById
  const hall1 = await getHallById('hall-1');
  if (!hall1 || hall1.name !== 'The Tamarind Tree Heritage Pavilion') {
    throw new Error('getHallById failed to retrieve hall-1');
  }
  console.log(`[PASS] getHallById('hall-1') retrieved: "${hall1.name}" (Dimensions: ${hall1.dimensions.width}m x ${hall1.dimensions.length}m x ${hall1.dimensions.height}m)`);

  // Test 7: createEnquiry
  await createEnquiry('hall-1', {
    name: 'Anjali Verma',
    phone: '+91 98111 22334',
    email: 'anjali@example.com',
    eventDate: '2026-11-20',
    guestCount: 650,
    message: 'Wedding and Reception enquiry',
  });
  console.log('[PASS] createEnquiry() executed successfully and resolved Promise.');

  console.log('\n--- ALL SERVICE LAYER TESTS PASSED! ---');
}

testService().catch((err) => {
  console.error('[FAIL] Service test error:', err);
  process.exit(1);
});

