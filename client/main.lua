ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	while ESX.GetPlayerData().job == nil do
		Citizen.Wait(100)
	end

	ESX.PlayerData = ESX.GetPlayerData()
end)

RegisterNUICallback('close_config', function(data, cb)
	SetNuiFocus(false, false)
end)

Citizen.CreateThread(function()
	while true do
		local veh = GetVehiclePedIsIn(PlayerPedId(), false)
		local player = PlayerPedId()
		Citizen.Wait(50)
		if IsPedInVehicle(player, veh) and GetIsVehicleEngineRunning(veh) then
		SendNUIMessage({
			type = 'OPEN',
			speed = (math.floor(GetEntitySpeed(GetVehiclePedIsIn(PlayerPedId(), false)) * 3.6)),
			fuel = math.floor(GetVehicleFuelLevel(veh)),
			engine = math.floor(GetVehicleEngineHealth(veh)),
			oil = math.floor(GetVehicleOilLevel(veh))
		})
	else
		SendNUIMessage({
			type = 'CLOSE',
		})
		end
	end
end)

RegisterCommand('openconfig', function()
	if IsPedInAnyVehicle(PlayerPedId(), false) then
		SetNuiFocus(true, true)
		SendNUIMessage({
			type = 'OPEN_CONFIG',
		})
	else 
		ESX.ShowNotification('Du måste sitta i ett fordon för att konfigurera detta!')
	end
end)

RegisterCommand('setoil', function()
	SetVehicleOilLevel(GetVehiclePedIsIn(PlayerPedId(), false), 100.0)
end)

RegisterCommand('setfuel', function()
	SetVehicleFuelLevel(GetVehiclePedIsIn(PlayerPedId(), false), 10.0)
end)